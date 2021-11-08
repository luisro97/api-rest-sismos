import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

//modelacion de Users a traves de sequelize
const Users = sequelize.define("users", {
    id_user: {                          //definicion de id_user, su tipo de dato y su definicion de primary key
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {                            //definicion de username y su tipo de dato
        type: Sequelize.TEXT,
    },
    email: {                                //definicion de email y su tipo de dato
        type: Sequelize.TEXT,
    },
    passwrd: {                              //definicion de passwrd y su tipo de dato
        type: Sequelize.TEXT,
    },
}, {
    timestamps: false
});


export default Users;