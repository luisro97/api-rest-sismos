import Sequelize from 'sequelize';
import config from '../config.js';

//confiuracion del sequelize para su utilizacion
export const sequelize = new Sequelize(
    config.db_name,
    config.db_user,
    config.db_password, {
        host: config.db_host,
        dialect: 'postgres',
        pool: {
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        //VER OPERACIONES POR CONSOLA
        logging: false,
    },
)