const inquirer = require('inquirer');
require('colors');

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: '¿Qué deseas hacer?',
    choices: [
        {
            value: '1',
            name: `${'1. '.red}${'Registrar usuarios'.gray}`
        },
        {
            value: '2',
            name: `${'2. '.red}${'Mostrar usuarios registrados y sus cuartos'.gray}`
        },
        {
            value: '3',
            name: `${'3. '.red}${'Mostrar usuarios, cuartos y servicios adicionales'.gray}`
        },
        {
            value: '4',
            name: `${'4. '.red}${'Agregar cuartos a un usuario'.gray}`
        },
        {
            value: '5',
            name: `${'5. '.red}${'Agregar servicios adicionales'.gray}`
        },
        {
            value: '6',
            name: `${'6. '.red}${'Borrar usuarios'.gray}`
        },
        {
            value: '0',
            name: `${'0. '.red}${'Salir'.gray}`
        }
    ]
};

const inquirerMenu = async () => {
    console.log('============================'.gray);
    console.log('|           HOTEL          |'.white);
    console.log('============================'.gray);

    let opt = '';

    await inquirer.prompt(preguntas).then(data => {
        opt = data['opcion'];
    });

    return opt;
}

const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar\n`
        }
    ];
    let pau = '';
    console.log('\n');
    await inquirer.prompt(question).then(data => {
        pau = data['enter'];
    });
    return pau;
}

const read = async () => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message: 'Nombre del usuario:',
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor, ingrese un valor';
                }
                return true;
            }
        }
    ];

    const respuestas = await inquirer.prompt(pregunta);
    return {
        desc: respuestas.desc,
    };
}

module.exports = {
    inquirerMenu,
    pausa,
    read
}
