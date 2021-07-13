import Sequelize from 'sequelize';
import { sequelize } from '../database/database';

//modelacion de sismo a traves de sequelize
const Sismo = sequelize.define("reg_sismo", {
    id_registro: {                          //definicion de id_registro , el tipo de dato y definicion de primary key
        type: Sequelize.NUMBER,
        primaryKey: true
    },
    fecha_local: {                          //definicion de fecha_local y el tipo de dato 
        type: Sequelize.DATE,
    },
    latitud: {                              //definicion de latitud y el tipo de dato 
        type: Sequelize.DOUBLE
    },
    longitud: {                             //definicion de longitud y el tipo de dato 
        type: Sequelize.DOUBLE
    },
    profundidad: {                          //definicion de fprofundidad y el tipo de dato 
        type: Sequelize.INTEGER
    },
    magnitud: {                             //definicion de magnitud y el tipo de dato 
        type: Sequelize.DOUBLE
    },
    ref_geografica: {                       //definicion de ref_geografica y el tipo de dato 
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

export default Sismo;