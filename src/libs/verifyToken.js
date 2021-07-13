import jwt from "jsonwebtoken";
import config from '../config';

//Funcion que verifica el token recibido
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];              //Obtiene el parametro de autorizacion de la cabecera
    if (typeof bearerHeader != 'undefined') {                       //Si la cabecera no esta indefinida
        const bearer = bearerHeader.split(" ");                     //Se separa el token de la palabra bearer --> (bearer f78d9ahf7d789a...)
        const bearerToken = bearer[1];                              //Se almacena el token
        const token = bearerToken;                                  
        jwt.verify(token, config.secret, function (error) {
            if (error) {                                            //Si el token no es valido, se retorna fecha, hora y mensaje de error
                let fechaHora = new Date();
                fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
                return res.status(401).json({
                    date: fechaHora,
                    message: 'Token invalido'
                });
            } else {                                                //Si es valido sigue la operacion
                const decoded = jwt.verify(token, config.secret);
                req.username = decoded.username;
                next();
            }
        })
    } else {                                                        //Si la cabecera de autorizacion es undefined, se retorna fecha, hora y mensaje de error
        let fechaHora = new Date();
        fechaHora = fechaHora.toLocaleString('es-CL', { timezone: 'America/Santiago' })
        return res.status(401).json({
            date: fechaHora,
            message: 'No se ha proporcionado un token'
        });
    }
}

module.exports = verifyToken;