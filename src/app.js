import express, {json} from 'express';
import morgan from 'morgan';
import cheerio from 'cheerio';
import request from 'request-promise';
import requestPromise from 'request-promise';
import jwt from 'jsonwebtoken';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import config from './config.js';
import Sismo from './models/sismos.js';
import sismosRoutes from './routes/sismos.routes.js';
import usersRoutes from './routes/users.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {                                            //configuracion del Swagger 
    swaggerDefinition: {
        openapi: "3.0.1",
        info: {
            version: "1.0.0",
            title: "Sismos API",
            description: "Sismos API Information",
            contact: {
                name: "Grupo X",
                email: "luis.salinasp@utem.cl"
            },
            servers: ["http://localhost:4000"]
        },
        components: {
            securitySchemes: {                                            //configuracion de seguridad para reconocer el Token en el swagger
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    apis: ["./src/routes/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/grupo-x/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));            //ruta de acceso al swagger

app.use(morgan('dev'));                                     //definicion para el uso de morgan
app.use(json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})

//funcion asincrona que se utliza para hacer el scraping a la pagina
export async function scrapSismos() {
    try {
        const result = await request.get("http://www.sismologia.cl/ultimos_sismos.html");         //cosntante que espera los datos resultantes de la pagina http://www.sismologia.cl/links/ultimos_sismos.html
        const $ = cheerio.load(result);
        const data = [];

        $("body > div > div > table > tbody > tr").each((index, elem) => {                             //tabla que contiene los datos de los sismos para luego ingresarlos en variables
            if(index == 0) return true
            const tds = $(elem).find("td");
            const fecha_local = $(tds[0]).text();
            const fecha_utc = $(tds[1]).text();
            const latitud = $(tds[2]).text();
            const longitud = $(tds[3]).text();
            const profundidad = $(tds[4]).text();
            const magnitud = $(tds[5]).text();
            const ref_geografica = $(tds[6]).text();
            const table_row = {
                fecha_local,
                fecha_utc,
                latitud,
                longitud,
                profundidad,
                magnitud,
                ref_geografica
            };
            data.push(table_row);
        });
        console.log(data)
        return data;
    } catch (error) {
        console.log("Ha ocurrido un error, informacion a continuacion: ", error);       //informacion en caso de exista un error al realizar la funcion asincrona
    }
}

//funcion asincrona para creacion de sismos que contiene el motodo post
export async function createPosts(data) {
    try {
        for (let i = 0; i < data.length; i++) {
            let id = data[i].fecha_local.replace(/[^0-9]/g, '');                        //generacion del id para un sismo para luego registralo en la base de datos
            let fecha = new Date(data[i].fecha_local.replace(/[/]/g, '-'));             //estandarizacion de la fecha para evitar errores al resgitrar en la base de datos
            const token = jwt.sign({usrpw: config.sismos_usr + config.sismos_pw}, config.secret, {    //creacion de token para la seguridad de la api
                expiresIn: config.sismos_expires
            });
            let options = {                                             //configuracion para la creacion de sismos mediante llamado a la misma api 
                method: 'POST',
                uri: 'http://localhost:4000/grupo-x/earthquakes',
                headers: {
                    "Content-type": "application/json",
                },
                auth: {
                    'bearer': token
                },
                body: {
                    id_registro: data[i].fecha_local.replace(/[^0-9]/g, ''),        //estandarizacion de datos de la fecha en la creacion del json
                    fecha_local: fecha,
                    latitud: data[i].latitud,
                    longitud: data[i].longitud,
                    profundidad: parseInt(data[i].profundidad),
                    magnitud: data[i].magnitud.replace(/[MmLlWw]/g, ''),            //estandarizacion de la magnitud en la creacion del json
                    ref_geografica: data[i].ref_geografica
                },
                json: true
            };
            const reg = await Sismo.findByPk(id);               //constante asincrona a la espera del id del sismo para realizar la peticion de creacion
            if (reg === null) {
                requestPromise(options)                            //espera la promesa para continuar con la configuracion definida anteriormente
                    .then(function (parsedBody) {
                        console.log('registro creado', parsedBody);
                    })
                    .catch(function (error) {
                        console.log("Ha ocurrido un error, informacion a continuacion: ", error);       //salida en caso de ocurrir un error
                    })
            }
        }
    } catch (error) {
        console.log("Ha ocurrido un error, informacion a continuacion: ", error);       //salida en caso de ocurrir un error     
    }
}

//funcion para el parseo del json y obtencion de la hora local
export function toLocalTz(obj) {
    try {
        const string = JSON.stringify(obj);
        const parsed = JSON.parse(string);
        if (parsed[0]) {
            const data = [];
            for (let i = 0; i < parsed.length; i++) {       //guardado de los datos de los sismos en la array data
                const fecha_local = new Date(parsed[i].fecha_local.replace(/[/]/g, '-')).toLocaleString('es-CL', {timezone: 'America/Santiago'});     //Se cambia el formato de la fecha y se le asigna zona horaria de Chile
                const id_registro = parsed[i].id_registro;
                const latitud = parsed[i].latitud;
                const longitud = parsed[i].longitud;
                const profundidad = parsed[i].profundidad;
                const magnitud = parsed[i].magnitud;
                const ref_geografica = parsed[i].ref_geografica;
                const row = {id_registro, fecha_local, latitud, longitud, profundidad, magnitud, ref_geografica};
                data.push(row);
            }
            return data;
        } else {
            const fecha_local = new Date(parsed.fecha_local.replace(/[/]/g, '-')).toLocaleString('es-CL', {timezone: 'America/Santiago'});
            const id_registro = parsed.id_registro;
            const latitud = parsed.latitud;
            const longitud = parsed.longitud;
            const profundidad = parsed.profundidad;
            const magnitud = parsed.magnitud;
            const ref_geografica = parsed.ref_geografica;
            const newJson = {id_registro, fecha_local, latitud, longitud, profundidad, magnitud, ref_geografica};
            return newJson;
        }
    } catch (error) {
        console.log("Ha ocurrido un error, informacion a continuacion: ", error);
    }
}


app.use('/grupo-x/auth', authRoutes);
app.use('/grupo-x/earthquakes', sismosRoutes);
app.use('/grupo-x/users', usersRoutes);

export default app;