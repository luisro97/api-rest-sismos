import {Router} from 'express';
import verifyToken from '../libs/verifyToken.js';
import { createUser, getUsers, getProfile } from '../controllers/users.controller.js';

const router = Router();

//definicion del esquema user que contiene los datos de un usuario en swagger

/**
 * @swagger
 * components:
 *   schemas:
 *          users:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      description: Nombre del usuario
 *                      example: 'Juanito'
 *                  email:
 *                      type: string
 *                      description: Correo del usuario
 *                      example: 'Juanito@gmail.com'
 *                  passwrd:
 *                      type: string
 *                      description: Contraseña del usuario
 *                      example: 'juanito1234'
 */

//creacion del metodo post para crear un usuario en swagger

/**
 * @swagger
 * /users:
 *  post:
 *   summary: Crear usuario
 *   tags: [users]
 *   description: Se crea un usuario en la base de datos para poder tener acceso a las demas operaciones
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/users'
 *   responses:
 *    200:
 *     description: Usuario creado exitosamente
 *    500:
 *     description: Error interno del servidor
 *    400:
 *     description: El nombre de usuario y/o contraseña ya estan en uso
 */
router.post('/', createUser);           //ruta para la creacion de un usario a traves de la funcion createUser



//creacion del metodo get para la obtencion de los datos de los usuarios en swagger

/**
 * @swagger
 * /users:
 *  get:
 *    summary: Ver usuarios
 *    security:
 *      - bearerAuth: []
 *    tags: [users]
 *    description: Se listan todos los usuarios registrados
 *    responses:
 *      200:
 *        description: Se muestran todos los usuarios
 *      404:
 *        description: No se encontraron usuarios
 *      500:
 *        description: Error interno del servidor
 */
router.get('/', verifyToken, getUsers);         //ruta del metodo get para obtener los datos de los usuarios, con la verificacion del token y atraves de la funcion getUsers

//creacion  del metodo get para la obtencion de los datos de un usario a traves del token en swagger

/**
 * @swagger
 * /users/profile:
 *  get:
 *    summary: Muestra el perfil del usuario
 *    security:
 *      - bearerAuth: []
 *    tags: [users]
 *    description: Muestra el perfil del usuario, obtiene la informacion desde el token y la busca en la base de datos
 *    responses:
 *      200:
 *        description: Se muestran los datos del usuario
 *      404:
 *        description: No se ha encontrado el usuario
 *      500:
 *        description: Error interno del servidor
 */
router.get('/profile', verifyToken, getProfile);        //ruta del metodo get para obtener los datos de un usuario, con la verificacion del token y atraves de la funcion getProfile

export default router;