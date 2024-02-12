require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
} = require('./helpers/inquirer');
// const Tarea = require('./models/tarea');
const Tareas = require('./models/tareas');

// console.clear()

const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { //Cargar tareas
        tareas.cargarTareaFromArray(tareasDB)
    }



    do {
        // Imprimir el menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto();
                // console.log(tareas.listadoArr);
                break;
            case '3': //Listar completadas
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': //Listar pendientes
                tareas.listarPendientesCompletadas(false);

                break;

            case '6': //Borrar
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {

                    const ok = await confirmar('¿Está seguro?')
                    // TODO: Preguntar si esta seguro
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;

        }

        guardarDB(tareas.listadoArr)



        // const tareas = new Tareas();
        // const tarea = new Tarea('Comer');
        // tareas._listado[tareas.id] = tarea; 
        // console.log(tareas)

        await pausa();

    } while (opt !== '0');


}


main();



