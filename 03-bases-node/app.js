const { crearArchivo } = require('./helpers/multiplicar')


console.clear();


const [, , arg3 = 'base=5'] = process.argv;
const [, base=5] = arg3.split('=');

// console.log(base);




// const base = 3;


crearArchivo(base)
    .then(nombreArchivo =>console.log(nombreArchivo, 'Creado'))
    .catch (err => console.log(err));

