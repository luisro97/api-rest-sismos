module.exports = {
    //SECRET KEY GENERAL
    secret: process.env.AUTH_SECRET || 'sXzUT!PCm2Yzj3gtCXGTfCHx!t8zsJ',
    //VARIABLES AUTH
    auth_expires: process.env.AUTH_EXPIRES || '24h',
    auth_rounds: process.env.AUTH_ROUNDS || 10,
    //VARIABLES EXEC
    exec_interval: process.env.EXEC_INTERVAL || 10000,
    //VARIABLES SISMOS
    sismos_usr: process.env.SISMOS_USR || 'tp!zN%rHMU3eeV&y8t!9vCJ?7SJDqn',
    sismos_pw: process.env.SISMOS_PW || 'uBBWFcx44z#9TC%KVECvswmguuq9%3',
    sismos_expires: process.env.SISMOS_TOKEN_EXP || '1h',
    //VARIABLES DB
    db_name: process.env.DB_NAME || 'sismos',
    db_user: process.env.DB_USER || 'postgres',
    db_password: process.env.DB_PASSWORD || 'admin1234',
    db_host: process.env.DB_HOST || 'localhost'
};