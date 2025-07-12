//variables
const consola = document.querySelector('#consola');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const genero = document.querySelector('#genero');
//contenedor para lo resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;


//generar objeto con la busqueda
const datosBusqueda = {
		consola: '',
		year: '',
		minimo: '',
        maximo:'',
		genero: ''
}


//eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarJuegos(videojuegos);    //muestra los videojuegos al cargar

    //llena las opciones de años
    llenarSelect();

});

//eventos para los select de busqueda
consola.addEventListener('change', e =>{
    datosBusqueda.consola = e.target.value;
    filtarVideoJuego();
})

year.addEventListener('change', e =>{
    datosBusqueda.year = parseInt(e.target.value);
    filtarVideoJuego();
})

minimo.addEventListener('change', e =>{
    datosBusqueda.minimo = e.target.value;
    filtarVideoJuego();
})

maximo.addEventListener('change', e =>{
    datosBusqueda.maximo = e.target.value;
    filtarVideoJuego();
})

genero.addEventListener('change', e =>{
    datosBusqueda.genero = e.target.value;
    filtarVideoJuego();
})

//funciones
function mostrarJuegos(videojuegos){
    limpiarHTML(); //elimina el html previo
    videojuegos.forEach( videojuegos => {
        const { nombre, consola, year, precio, genero } = videojuegos;
        const vjuegoHTML = document.createElement('p');

        vjuegoHTML.textContent = `
            ${nombre} ${consola} ${year} - Precio: ${precio} - Genero: ${genero}
        `;
        //insertar en el html
        resultado.appendChild(vjuegoHTML);
    })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


//generar los años del select
function llenarSelect(){
    for( let i = max; i >= min; i-- ){ //queremos primero los videojuegos de los años recientes
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select
    }
}

//funcion que filtra en base a la busqueda
function filtarVideoJuego(){
    const resultado = videojuegos.filter( filtrarConsola ).filter( filtrarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarGenero );

    if(resultado.length){
        //console.log(resultado)
        mostrarJuegos(resultado);
    }else{
        noResultado();
    }
    
}

function noResultado(){
    limpiarHTML();
    
    const noResultado =document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados';

    resultado.appendChild(noResultado);
}

function filtrarConsola(videojuegos){
    const { consola } = datosBusqueda;
    if(consola){
        return videojuegos.consola === consola;
    }
    return videojuegos;
}

function filtrarYear(videojuegos){
    const { year } = datosBusqueda;
    if(year){
        return videojuegos.year === year;
    }
    return videojuegos;

}

function filtrarMinimo(videojuegos){
    const { minimo } = datosBusqueda;
    if(minimo){
        return videojuegos.precio >= minimo;
    }
    return videojuegos;
}

function filtrarMaximo(videojuegos){
    const { maximo } = datosBusqueda;
    if(maximo){
        return videojuegos.precio <= maximo;
    }
    return videojuegos;
}

function filtrarGenero(videojuegos){
    const { genero } = datosBusqueda;
    if(genero){
        return videojuegos.genero === genero;
    }
    return videojuegos;
}

