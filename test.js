/*

1.- mirarse como hice las peticiones en esta pagina: sobre todo la de post+id en un formulario select
https://github.com/josanescod/gestiona-escola/blob/master/js/estudiants_connectats.js mirar el metodo onchange y las funciones activaConsultaAlumnos
y comboProfesores
https://github.com/josanescod/gestiona-escola


2.- endpoint con peticion get+parametro 

Endpoint: https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/experiencias/1

3.- ver como crear una funcion con un parametro opcional listar (b,param)
https://www.geeksforgeeks.org/how-to-declare-the-optional-function-parameters-in-javascript/#:~:text=To%20declare%20optional%20function%20parameters,end%20on%20the%20parameter%20list.


*/
const buttons = ['usuarios', 'comentarios', 'emails', 'experiencias', 'fotos', 'hoteles', 'ofertas', 'perfiles',
    'roles', 'servicios', 'tipos'];

const show = 'mostrar'
const load = 'cargar'

window.onload = () => {

    console.log('cargando script');
    loadButtons();
}

function loadButtons() {
    console.log('cargando botones')
    //botones peticiones
    for (let b of buttons) {
        let button = document.querySelector('#' + b);
        button.addEventListener('click', () => {

            console.log(`mostrar ${b}`)
            listar(b, show);
            borrar();


        })
    }
    //boton de borrar
    let borrarLista = document.querySelector('#borrar');
    borrarLista.addEventListener('click', () => {

        console.clear();
        console.log('borrado completado ');
        document.querySelector('div > ol').remove();
    })

    //selector experiencias
    let selectexp = document.querySelector('#selectexp');
    //primero una peticion a experiencias para cargar el selector con los datos
    listar('experiencias', load);
    // crear el evento onchange 
        selectexp.addEventListener('change', () => {
        let svalue = selectexp.value;

        console.log('accionando selector',svalue)
        listar('experiencias', show,svalue);//la funcion listado para aprovecharla crear otro parametro 'load/show'
        //borrar()

    })
    //cargar los datos
}


/* Modificar esta funcion para añadir un parametro opcional que sera el id para hacer peticiones por id 
https://www.geeksforgeeks.org/how-to-declare-the-optional-function-parameters-in-javascript/#:~:text=To%20declare%20optional%20function%20parameters,end%20on%20the%20parameter%20list.
*/
function listar(lista, action, param = 0) {

    if (param == 0) {
        var url = `https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/${lista}`
        console.log(url)
    }else{
        var url = `https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/${lista}/${param}`
        console.log(url)
    }


    
    let request = new Request(url, {
        method: 'GET',
    })
    //llamada a la api 
    fetch(request)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Ha habido algun problema. Status Code: ' +
                        response.status);
                    return;
                }
                // respuesta peticion
                response.json().then(function (data) {
                    if (action == show) {
                        console.log('show')
                        muestraDatos(data, lista);

                    } else {
                        console.log('load')
                        cargaDatos(data, lista);
                    }

                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });


}

function muestraDatos(data, lista) {
    console.log('has seleccionado la lista: ' + lista)
    /*data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });*/
    console.log(data)
    let listView = document.createElement('ol');
    for (var i = 0; i < data.length; i++) {
        let listViewItem = document.createElement('li');
        if (lista == 'usuarios') {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' usuario:' + data[i]['nombre']))

        }
        else if (lista == "comentarios") {
            listViewItem.appendChild(document.createTextNode(
                data[i]['fecha'] + ' ' +
                data[i]['titulo'] + ' ' +
                data[i]['comentario']


            ))

        }
        else if (lista == "emails") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'direccion: ' + data[i]['direccion'] + ' ' +
                'telefono: ' + data[i]['telefono'] + ' ' +
                'mensaje: ' + data[i]['mensaje']
            ))

        }
        else if (lista == "experiencias") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'descripcion: ' + data[i]['descripcion'] + ' ' +
                'puntuacion: ' + data[i]['puntuacion'] + ' ' +
                'precio: ' + data[i]['precio']
            ))


        }
        else if (lista == "fotos") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre']

            ))

        }
        else if (lista == "hoteles") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'direccion: ' + data[i]['direccion']
            ))

        }
        else if (lista == "ofertas") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'codigo: ' + data[i]['codigo'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'descripcion: ' + data[i]['descripcion']
            ))

        }
        else if (lista == "perfiles") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre']

            ))

        }
        else if (lista == "roles") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre']

            ))

        }
        else if (lista == "servicios") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'descripcion: ' + data[i]['descripcion'] + ' ' +
                'precio: ' + data[i]['precio']

            ))

        }
        else if (lista == "tipos") {
            listViewItem.appendChild(document.createTextNode(
                'id: ' + data[i]['id'] + ' ' +
                'nombre: ' + data[i]['nombre'] + ' ' +
                'perfiles: '

            ))

            let perfiles = data[i]['perfiles']
            for (var j = 0; j < perfiles.length; j++) {
                console.log('id: ' + perfiles[j]['id'] + ' ' + 'nombre: ' + perfiles[j]['nombre'])
                listViewItem.appendChild(document.createTextNode(
                    ' id: ' + perfiles[j]['id'] + ' ' + 'nombre: ' + perfiles[j]['nombre'] + ''
                ))
            }
        }
        else {
            console.log('listado no disponible')
        }

        listView.appendChild(listViewItem)

    }

    document.querySelector('#lista').appendChild(listView)

}

function cargaDatos(data, lista) {
    console.log('cargando ' + lista)
    console.log(data)
    if (lista == 'experiencias') {
        for (var i = 0; i < data.length; i++) {
            let optionItem = document.createElement('OPTION');
            optionItem.setAttribute("value", data[i]['id']);
            let textoptionItem = document.createTextNode(data[i]['nombre']);
            optionItem.appendChild(textoptionItem);
            document.querySelector('#selectexp').appendChild(optionItem);

        }
    }


}

function borrar() {

    console.clear();
    console.log('borrado completado ');
    document.querySelector('div > ol').remove();

}