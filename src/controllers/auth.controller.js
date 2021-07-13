import Users from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config';
import bcrypt from 'bcryptjs';

//funcion asincrona para el incio de secion
export async function signIn(req, res, next) {
    try {
        const {email, passwrd} = req.body;                    //obtencion de los datos ingresados en el body
        const user = await Users.findOne({                       //busqueda del usuario
            where: {email}
        });
        if (!user) {                                //if en caso de no encontrar el usuario ingresado
            let fechaHora = new Date();
            fechaHora = fechaHora.toLocaleString('es-CL', {timezone: 'America/Santiago'})
            res.status(404).json({
                date: fechaHora,
                message: 'El usuario no existe, intentelo de nuevo'         //salida json en caso de no encontrar el usuario ingresado
            });
        } else {
            if (bcrypt.compareSync(passwrd, user.passwrd)) {                //verificacion del usuario atraves del token 
                const token = jwt.sign({username: user.username}, config.secret, {
                    expiresIn: config.auth_expires
                });
                res.status(200).json({                  //salida del json en caso de inicio de sesion correcta con los datos del usuario y su token 
                    user,
                    token
                });
            } else {
                let fechaHora = new Date();
                fechaHora = fechaHora.toLocaleString('es-CL', {timezone: 'America/Santiago'})
                res.status(400).json({
                    date: fechaHora,
                    message: 'Contraseña incorrecta'            //salida del json en caso de haber ingresado la contraseña incorrecta
                });
            }
        }
    } catch (error) {
        let fechaHora = new Date();
        fechaHora = fechaHora.toLocaleString('es-CL', {timezone: 'America/Santiago'})
        res.status(500).json({
            date: fechaHora,
            message: 'Ha ocurrido un error inesperado'              //salida del json en caso haber un error
        });
        console.log('Ha ocurrido un error, informacion a continuacion: ', error);           //salida en caso de haber un error y su descripcion
    }
}