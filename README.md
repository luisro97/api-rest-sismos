# API RESTful Sismos
API RESTful que realiza webScraping a una pagina de sismologia, para luego procesar los datos y guardarlos en una base de datos PostgreSQL, para así poder disponer de los datos a través de la API.

## Como ejecutar
Las siguientes instrucciones te permitirán obtener una copia del proyecto y ponerlo en marcha.

### Pre-requisitos
- NodeJS
- Npm (node package manager)
- PostgreSQL

### Instalación
1. **Obtener una copia del proyecto**\
_Para esto puedes descargar directo desde GitHub o utilizar el comando clone de git desde un terminal_
```
git clone https://github.com/LuisSP97/api-rest-cpyd
```

2. **Instalación de módulos necesarios para la ejecución**\
_Aquí simplemente deberás ejecutar desde el terminal un script creado en el proyecto, el cual instala los módulos necesarios para su ejecución_
```
npm install
```

3. **Ejecucion de servidor de desarrollo**\
_Sera tan simple como utilizar el siguiente script_
```
npm run dev
```
 
     
## Ejecución del proyecto
1. Para ejecutarlo deberás utilizar el siguiente comando en un terminal
```
npm start
```

## Docker / Docker-compose
El proyecto cuenta con un Dockerfile y docker-compose, por lo que podrás probarlo utilizando estas tecnologías. Para esto necesitas tener instalado tanto Docker como Docker-compose. Puedes consultar la documentación para la instalación en los siguientes enlaces:

* [Ubuntu/Docker](https://docs.docker.com/engine/install/ubuntu/) - Instrucciones para Ubuntu
* [MacOS/Docker](https://docs.docker.com/docker-for-mac/install/) - Instrucciones para MacOS
* [Windows/Docker](https://docs.docker.com/docker-for-windows/install/) - Instrucciones para Windows
* [Docker Compose](https://docs.docker.com/compose/install/) - Instrucciones para todos los S.O

Una vez tengas ambas tecnologías instaladas, utilizando Docker instalaras postgres:
```
docker pull postgres
```
Crearas la imagen de la API REST de los sismos:
```
docker build . -t api-sismos
```
Por ultimo ejecutaras docker compose para poner el proyecto en marcha:
```
docker-compose up -d
```
Y listo! Visitando el siguiente enlace deberías poder ver la documentación con Swagger y poder probar la API REST:
```
http://localhost:4000/grupo-x/api-docs
```

## Instrucciones de uso
1. Crear usuario en "_/grupo-x/users_". Se debe enviar un body con username (Nombre de usuario), email (Correo electronico) y passwrd (Contraseña). Esto retornara un Token de acceso que debes copiar.
2. Agregar el token de acceso. En caso de estar en Swagger se debe seleccionar la opción Authorize y pegar el token. En caso de estar utilizando un cliente como Insomnia o Postman, se debe enviar en un Authorization Bearer
3. Probar las funciones. Si estas en Swagger puedes probar todas las funciones sin problema. Si estas en un cliente como Insomnia o Postman deberás indicar a cada función el Authorization Bearer.
4. El método POST de "_/grupo-x/earthquakes_", esta bloqueado para los usuarios, para así mantener la integridad de la información.

## Información del proyecto
### Construido con
* [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) - Lenguaje de programación
* [Node.JS](https://nodejs.org/es/) - Entorno de ejecución
* [PostgreSQL](https://www.postgresql.org/) - Motor de base de datos

#### Modulos
* [Cheerio.JS](https://cheerio.js.org/) - API webScraping
* [Request](https://www.npmjs.com/package/request) - API Llamadas HTTP - Necesario para Request-promise
* [Request-promise](https://www.npmjs.com/package/request-promise)
* [Express](https://expressjs.com/es/) - Interfaz de aplicaciones web para Node.JS
* [Pg](https://node-postgres.com/) - Driver para conectarse a la base de datos
* [Pg-hstore](https://www.npmjs.com/package/pg-hstore/v/2.3.2) - Modulo para poder utilizar Sequelize
* [Sequelize](https://sequelize.org/) - ORM para Node.JS
* [Morgan](https://www.npmjs.com/package/morgan) - Logger para requests de HTTP para Node.JS
* [Babel](https://babeljs.io/) - Modulo para compatibilizar codigo next-gen de JS con el de navegadores
* [BcryptJS](https://www.npmjs.com/package/bcryptjs) - Modulo para encriptar contraseñas
* [Jsonwebtoken](https://jwt.io/) - Modulo de autenticacion
* [Swagger JSDoc](https://www.npmjs.com/package/swagger-jsdoc) - Modulo para generar documentacion Swagger

