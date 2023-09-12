const colors = require('colors');
const inquirer = require('inquirer');
const { mostrarMenu } = require('./helpers/mensaje');
const { inquirerMenu, pausa, read } = require('./helpers/inquirer');
const { guardarDB } = require('./helpers/guardarArchivo');
const Usuario = require('./models/usuario');
const preguntaBorrar = require('./helpers/PreguntaBorrar');

const main = async () => {
    let opt = '';
    const usuariosRegistrados = [];

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const { desc } = await read();
                const nuevoUsuario = new Usuario(desc);
                usuariosRegistrados.push(nuevoUsuario);
                break;
            case '2':
                console.log('Usuarios registrados:');
                usuariosRegistrados.forEach((usuario, index) => {
                    console.log(`${index + 1}. ${usuario.nombre} - Cuarto: ${usuario.cuarto || 'N/A'}`);
                });
                break;
            case '3':
                console.log('Usuarios registrados:');
                usuariosRegistrados.forEach((usuario, index) => {
                    console.log(`Usuario ${index + 1}: ${usuario.nombre}`);
                    console.log(`Número de Cuarto: ${usuario.cuarto || 'N/A'}`);
                    if (usuario.servicios && usuario.servicios.length > 0) {
                        console.log('Servicios Adicionales:');
                        usuario.servicios.forEach((servicio, idx) => {
                            console.log(`  ${idx + 1}. ${servicio}`);
                        });
                    } else {
                        console.log('Sin servicios adicionales registrados.');
                    }
                    console.log('----------------------');
                });
                break;
            case '4':
                console.log('Usuarios registrados:');
                usuariosRegistrados.forEach((usuario, index) => {
                    console.log(`${index + 1}. ${usuario.nombre} - Cuarto: ${usuario.cuarto || 'N/A'}`);
                });

                const usuarioIndex = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'usuarioIndex',
                        message: 'Selecciona el número del usuario al que deseas agregar un número de cuarto (o "0" para volver atrás):',
                        validate(value) {
                            const num = parseInt(value);
                            if (isNaN(num) || num < 0 || num > usuariosRegistrados.length) {
                                return `Por favor, ingresa un número válido entre 0 y ${usuariosRegistrados.length}.`;
                            }
                            return true;
                        }
                    }
                ]);

                if (usuarioIndex.usuarioIndex === '0') {
                    
                } else {
                    const usuarioSeleccionado = usuariosRegistrados[usuarioIndex.usuarioIndex - 1];

                    const numeroCuarto = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'cuarto',
                            message: 'Ingresa el número de cuarto:',
                            validate(value) {
                                if (!value) {
                                    return 'Por favor, ingresa un número de cuarto.';
                                }
                                return true;
                            }
                        }
                    ]);

                    usuarioSeleccionado.cuarto = numeroCuarto.cuarto;
                }

                break;
            case '5':
                console.log('Usuarios registrados:');
                usuariosRegistrados.forEach((usuario, index) => {
                    console.log(`${index + 1}. ${usuario.nombre} - Cuarto: ${usuario.cuarto || 'N/A'}`);
                });

                const usuarioServiciosIndex = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'usuarioIndex',
                        message: 'Selecciona el número del usuario al que deseas agregar servicios adicionales (o "0" para volver atrás):',
                        validate(value) {
                            const num = parseInt(value);
                            if (isNaN(num) || num < 0 || num > usuariosRegistrados.length) {
                                return `Por favor, ingresa un número válido entre 0 y ${usuariosRegistrados.length}.`;
                            }
                            return true;
                        }
                    }
                ]);

                if (usuarioServiciosIndex.usuarioIndex === '0') {
                    
                } else {
                    const usuarioConServicios = usuariosRegistrados[usuarioServiciosIndex.usuarioIndex - 1];

                    const serviciosAdicionales = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'servicios',
                            message: 'Ingresa los servicios adicionales separados por comas (ejemplo: Wi-Fi, Desayuno, Limpieza):',
                            validate(value) {
                                if (!value) {
                                    return 'Por favor, ingresa al menos un servicio adicional.';
                                }
                                return true;
                            }
                        }
                    ]);

                    
                    usuarioConServicios.servicios = serviciosAdicionales.servicios.split(',').map(servicio => servicio.trim());
                }

                break;
            case '6':
                console.log('Usuarios registrados:');
                usuariosRegistrados.forEach((usuario, index) => {
                    console.log(`${index + 1}. ${usuario.nombre} - Cuarto: ${usuario.cuarto || 'N/A'}`);
                });

                const usuarioABorrarIndex = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'usuarioIndex',
                        message: 'Selecciona el número del usuario que deseas eliminar (o "0" para volver atrás):',
                        validate(value) {
                            const num = parseInt(value);
                            if (isNaN(num) || num < 0 || num > usuariosRegistrados.length) {
                                return `Por favor, ingresa un número válido entre 0 y ${usuariosRegistrados.length}.`;
                            }
                            return true;
                        }
                    }
                ]);

                if (usuarioABorrarIndex.usuarioIndex === '0') {
                    
                } else {
                    const usuarioABorrar = usuariosRegistrados[usuarioABorrarIndex.usuarioIndex - 1];

                    const confirmacion = await inquirer.prompt(preguntaBorrar);

                    if (confirmacion.confirmar) {
                        usuariosRegistrados.splice(usuarioABorrarIndex.usuarioIndex - 1, 1);
                        console.log(`Usuario "${usuarioABorrar.nombre}" eliminado.`);
                    } else {
                        console.log('Operación cancelada.');
                    }
                }

                break;
            default:
                break;
        }

        guardarDB(usuariosRegistrados);

        await pausa();
    } while (opt !== '0');
}

main();
