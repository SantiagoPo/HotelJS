const { stdin, stdout } = require('process');
require('colors');

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log('============================'.gray);
        console.log('|           HOTEL          |'.white);
        console.log('============================'.gray);
        console.log('                            ');
        console.log(`${'1. '.red}${'Agregar usuario'.gray}`);
        console.log(`${'2. '.red}${'Listar tareas'.gray}`);
        console.log(`${'3. '.red}${'Listar tareas completas'.gray}`);
        console.log(`${'4. '.red}${'Listar tareas pendientes'.gray}`);
        console.log(`${'5. '.red}${'Completar tarea'.gray}`);
        console.log(`${'6. '.red}${'Borrar tarea'.gray}`);
        console.log(`${'0. '.red}${'Salir'.gray}`);

        const readline = require('readline').createInterface({
            input: stdin,
            output: stdout
        });

        readline.question('Seleccionar la opción deseada: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

module.exports = {
    mostrarMenu
}
