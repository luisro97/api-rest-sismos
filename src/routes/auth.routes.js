import { Router } from 'express';
import { signIn } from '../controllers/auth.controller.js';

const router = Router();

//definicion del esquema auth para la realizacion del metodo post en swagger
/**
 * @swagger
 * components:
 *   schemas:
 *          auth:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: Correo del usuario
 *                      example: 'Juanito@gmail.com'
 *                  passwrd:
 *                      type: string
 *                      description: Contraseña del usuario
 *                      example: 'juanito1234'
 */

//creacion del metodo post para el inicio de sesion  en el swagger
/**
 * @swagger
 * /grupo-x/auth/signin:
 *  post:
 *   summary: Inicio de sesion
 *   tags: [auth]
 *   description: Inicia la sesion de un usuario con sus datos retornando un token valido para poder utilizar las demas funciones de la API
 *   requestBody:
 *    content:
 *     application/json:
 *       schema:
 *         $ref: '#/components/schemas/auth'
 *   responses:
 *    200:
 *      description: Sesion iniciada, se muestra el usuario y su token de sesion
 *    400:
 *      description: Correo y/o contraseña incorrecta
 *    404:
 *      description: El usuario no existe
 *    500:
 *     description: Error interno del servidor
 */
router.post('/signin', signIn);             //ruta del metodo post para el inicio de sesion

export default router;