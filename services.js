//modulo de pruebas 

const initmodulo = 'cargando modulo services';

function saluda(){
    console.log('ejecutando funcion saluda')
}



function borrar() {
    let orderedList = document.querySelector('#orderedList');
    if (orderedList) {
        orderedList.remove();
        //console.clear();    
    }
}

export {
    initmodulo,saluda,borrar

}