import app, { createPosts, scrapSismos } from "./app.js";
import config from "./config.js";
import '@babel/polyfill'

async function main() {
    try {
        let first = await scrapSismos();
        console.log(first);
        createPosts(first);
        setInterval(async() => {                                //funcion asincrona para definir el tiempo del scraping y registrarlos en la base de datos
            let aux = await scrapSismos();
            createPosts(aux);                                       //funcion en la creacion de sismos 
        }, config.exec_interval)
        app.listen(4000);                                       //puerto en el que se ejecutar la app
        console.log('app runing on port: 4000')
    } catch (error) {
        console.log("Ha ocurrido un error, informacion a continuacion: ", error);
    }
}

main();