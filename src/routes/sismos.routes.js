const { Router } = require('express');
const router = Router();
const verifyToken = require('../libs/verifyToken');
const verifyTokenSismo = require('../libs/verifyTokenSismo');
import { getSismo, getSismos, createSismo } from '../controllers/sismos.controller';

//defincion de esquema earthquakes que contiene los datos de un sismo en swagger
/**
 * @swagger
 * components:
 *   schemas:
 *     earthquakes:
 *        type: object
 *        properties:
 *            fecha_local:
 *                type: date
 *                description: Fecha y hora del sismo en zona horaria de Santiago de Chile
 *                example: '2021/07/07 17:49:39'
 *            latitud:
 *                type: double
 *                description: Latitud del sismo
 *                example: 21.53
 *            longitud:
 *                type: double
 *                description: Longitud del sismo
 *                example: 68.358
 *            profundidad:
 *                type: integer
 *                description: Profundidad del sismo
 *                example: 129
 *            magnitud:
 *                type: double
 *                description: Magnitud del sismo
 *                example: 3.2
 *            ref_geografica:
 *                type: string
 *                description: Referencia geografica del sismo
 *                example: '36 km al S de Ollagüe'
 */



//creacion del metodo post para la creacion de un sismo en el swagger
/**
 * @swagger
 * /grupo-x/earthquakes:
 *  post:
 *   security:
 *     - bearerAuth: []
 *   summary: Crear registro de sismo
 *   tags: [earthquakes]
 *   description: Crea registro de sismos encontrados en la pagina, esta operacion solo se ejecuta de forma automatica desde la misma API
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/components/schemas/earthquakes'
 *   responses:
 *    200:
 *     description: Se crea el registro del sismo exitosamente 
 *    500:
 *     description: Error interno del servidor
 *    401:
 *     description: No estas autorizado a ingresar registros de sismos
 */
router.post('/', verifyTokenSismo, createSismo);                    //ruta del metodo post para la creacion de un sismo con la verificacion a traves del token autogenerado

//creacion del metodo get para obtener todos los sismos registrados 
/**
 * @swagger
 * /grupo-x/earthquakes:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Ver todos los registros de sismos
 *    tags: [earthquakes]
 *    description: Permite ver todos los sismos que se han registrado en la base de datos
 *    responses:
 *      200:
 *        description: Se muestran todos los sismos de la base de datos
 *      404:
 *        description: No se encontro informacion en la base de datos
 *      500:
 *        description: Error interno del servidor
 */
router.get('/', verifyToken, getSismos);                    //ruta del metodo get para la obtencion de los sismos con la verificacion a traves del token

//creacion del metodo get para la ver los datos de un sismo a traves de la id en swagger
/**
 * @swagger
 * /grupo-x/earthquakes/{id_register}:
 *  get:
 *   security:
 *     - bearerAuth: []
 *   summary: Ver datos de un sismo
 *   tags: [earthquakes]
 *   description: 'Mediante el id de un sismo (Que son los numeros de la fecha y hora con el siguiente formato: yyyymmddhhmmss), se muestran los datos almacenados de este'
 *   parameters:
 *    - in: path
 *      name: id_registro
 *      schema:
 *       type: number
 *      required: true
 *      description: Id del sismo registrado
 *      example: 20210707174939
 *   responses:
 *    200:
 *     description: Se muestran los datos del sismo
 *    404:
 *      description: No se encontro el registro
 *    500:
 *      description: Error interno del servidor
 */
router.get('/:id_registro', verifyToken, getSismo);         //ruta del metodo get para la obtencion de un sismo con la verificacion a traves del token

module.exports = router;