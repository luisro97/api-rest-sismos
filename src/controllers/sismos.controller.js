import { toLocalTz } from '../app.js';
import Sismo from '../models/sismos.js';
import config from '../config.js';


//funcion asincrona para la obtencion de todos los sismos registrados 
export async function getSismos(req, res) {
    try {
        const regs = await Sismo.findAll({
            order: [
                ['fecha_local','DESC']
            ]
        });             //busqueda de todos los registros de sismos
        if (regs[0] == undefined) {                     // if en caso de que no se hayan encontrado registros de sismos
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
            res.status(404).json({
                date: fechaHora,
                message: 'No se han encontrado registros'           //mensaje de salida en caso de no existir registros
            })
        } else {                   // obtendcionde de registros con la hora local
            const regsTz = toLocalTz(regs)
            res.status(200).json({
                data: regsTz                               //salida del json con los datos de todos los sismos registrados en caso de que la peticion haya sido correcta
            });
        }
    } catch (error) {
        const fechaHora = new Date();                       
        res.status(500).json({
            message: 'Ha ocurrido un error inesperado'              //mensaje de salida en caso de que la peticion haya sido incorrecta
        });
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);       //mensaje de salida en caso de haya existido un error y su descripcion
    }
}


//funcion asincrona para la creacion de sismos la cual solo puede crearse a atraves del scraping de la API
export async function createSismo(req, res) {
    const { id_registro, fecha_local, latitud, longitud, profundidad, magnitud, ref_geografica } = req.body;
    try {
        if (req.usrpw == config.sismos_usr + config.sismos_pw) {        //if para verificar el el token 
            let newSismo = await Sismo.create({                               //variable newSismo que contiene los datos del nuevo sismo regsitrado em la pagina
                id_registro,
                fecha_local,
                latitud,
                longitud,
                profundidad,
                magnitud,
                ref_geografica
            }, {
                fields: ['id_registro', 'fecha_local', 'latitud', 'longitud', 'profundidad', 'magnitud', 'ref_geografica']
            });
            if (newSismo) {
                res.status(200).json({          
                    message: 'Registro creado exitosamente',        //salida del json con la creacion correcta del sismo y sus datos 
                    data: newSismo,
                });
            }
        } else {
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
            res.status(401).json({
                date: fechaHora,
                message: "No estas autorizado a realizar esta operacion"                //salida en caso de no contar con los permisos para crear un nuevo sismo
            });
        }
    } catch (error) {
        console.log("Ha ocurrido un error, informacion a continuacion: ", error)        //salida en caso de ocurrir un error y su descripcion
        let fechaHora = new Date();
        fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
        res.status(500).json({
            date: fechaHora,
            message: 'Ha ocurrido un error inesperado'                          //salida json en caso de ocurrir un error en al creacion del sismo
        })
    }

}


//funcion asincrona para la obtencion de un sismo a traves de su id 
export async function getSismo(req, res) {
    try {
        const { id_registro } = req.params;
        const reg = await Sismo.findOne({                   //busqueda del sismo a traves del ide
            where: {
                id_registro: id_registro
            }
        });
        if (reg) {
            const regTz = toLocalTz(reg);           
            res.status(200).json({                          //salida del json con los datos del sismo solicitado en caso de hacer la peticion de manera correcta
                data: regTz
            });
        } else {
            let fechaHora = new Date();         
            fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
            res.status(404).json({
                date: fechaHora,
                message: 'No se ha encontrado un registro con el identificador indicado'            //salida del json en caso de no haber encontrado el registro del sismo especificado
            })
        }
    } catch (error) {
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);           //salida en caso de haber un error y su descripcion
        let fechaHora = new Date();
        fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
        res.status(500).json({
            date: fechaHora,    
            message: 'Ha ocurrido un error inesperado'                          //salida del json en caso de haber un error en la peticion 
        });
    }
}