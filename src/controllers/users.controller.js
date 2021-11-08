import Users from '../models/users.js';
import jwt from 'jsonwebtoken';
import config from '../config.js';
import bcrypt from 'bcryptjs';

//funcion asincrona para la creacion de un usuario
export async function createUser(req, res) {
    const { username, email, passwrd } = req.body;                  //variables obtenidas del body
    try {
        let searchUsername = await Users.findOne({                  //buscar usuario obtenido
            where: {
                username
            }
        });
        let searchEmail = await Users.findOne({                     //buscar email obtenido
            where: {
                email
            }
        });
        if (searchEmail || searchUsername) {                        //if  par ver si el nombre de usuario o email ya existen en la bd
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })     //obtencion de fecha lolcal 
            res.status(400).json({
                date: fechaHora,
                message: 'El nombre de usuario y/o correo ya estan en uso'      //salida en caso de usario o correo ya en uso
            });
        } else {
            let password = bcrypt.hashSync(passwrd, Number.parseInt(config.auth_rounds));               //encripatcion de contraseña
            let newUser = await Users.create({                                                          //creacion de nuevo usuario
                username,
                email,
                passwrd: password
            }, {
                fields: ['username', 'email', 'passwrd']
            });
            if (newUser) {                                                                  //if en caso de la correcta creacion de usuario
                const token = jwt.sign({ username: username }, config.secret, {                //creacion de token para el usuario
                    expiresIn: config.auth_expires
                });
                res.status(200).json({
                    message: 'Usuario creado exitosamente, aqui esta su token',             //mensaje de de salida por la creacion correcta del usuario
                    auth: true,
                    token
                });
            }
        }
    } catch (error) {
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);       //mensaje de salida en caso de que haya un error y su descripcion
        res.status(500).json({
            message: 'Ha ocurrido un error inesperado'
        })
    }
}

//funcion asincrona para la obtencion de los datos de los usuarios
export async function getUsers(req, res) {
    try {
        const users = await Users.findAll();                    //obtencion de todos los usuarios
        if (users[0] == undefined) {                            //if en caso de que no se encuentre usuarios
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
            res.status(404).json({
                date: fechaHora,
                message: 'No se encontraron registros'
            });
        } else {
            res.status(200).json({              //salida del json con los usuarios en caso de que la peticion haya sido correcta
                users
            });
        }
    } catch (error) {
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);       //mensaje de salida en caso de que haya un error y su descripcion
        res.status(500).json({
            message: 'Ha ocurrido un error inesperado'
        });
    }
}


//funcion asincrona para obtener el perfil del usuario
export async function getProfile(req, res, next) {
    try {
        const user = await Users.findOne({      //busqueda de un usuario 
            where: {
                username: req.username      
            }
        });
        if (user) {
            res.status(200).json({              //salida del json con los datos del usuario solicitado en caso de que la peticion haya sido correcta
                user
            });
        }
        else {
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', {timezone: 'America/Santiago'});
            res.status(404).json({
                date: fechaHora,
                message: 'No se ha encontrado el perfil'
            });
        }
    } catch (error) {
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);                   //mensaje de salida en caso de que haya un error y su descripcion
        let fechaHora = new Date();
        fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
        res.status(500).json({
            date: fechaHora,
            message: 'Ha ocurrido un error inesperado'
        });
    }
}