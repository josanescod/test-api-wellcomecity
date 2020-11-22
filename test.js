/*
GET https://welcomcity.herokuapp.com/test/usuarios -> Listado de todos los usuarios
GET https://welcomcity.herokuapp.com/test/comentarios -> Listado de todos los comentarios
GET https://welcomcity.herokuapp.com/test/emails -> Listado de todos los emails
GET https://welcomcity.herokuapp.com/test/experiencias -> Listado de todos los experiencias
GET https://welcomcity.herokuapp.com/test/fotos -> Listado de todos los fotos
GET https://welcomcity.herokuapp.com/test/hoteles -> Listado de todos los hoteles
GET https://welcomcity.herokuapp.com/test/ofertas -> Listado de todos los ofertas
GET https://welcomcity.herokuapp.com/test/perfiles -> Listado de todos los perfiles
GET https://welcomcity.herokuapp.com/test/roles -> Listado de todos los roles
GET https://welcomcity.herokuapp.com/test/servicios -> Listado de todos los servicios
GET https://welcomcity.herokuapp.com/test/tipos -> Listado de todos los tipos


*/
const buttons = ['usuarios', 'comentarios', 'emails', 'experiencias', 'fotos', 'hoteles', 'ofertas', 'perfiles',
    'roles', 'servicios', 'tipos'];

window.onload = () => {

    console.log('cargando script');
    loadButtons();
    //borrar();

}

function loadButtons() {
    //botones peticiones
    for (let b of buttons) {
        let button = document.querySelector('#' + b);
        button.addEventListener('click', () => {
            
            console.log(`mostrar ${b}`)
            listar(b);
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
}

function listar(lista) {

    let url = `https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/${lista}`
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
                // Examine the text in the response
                response.json().then(function (data) {
                    //console.log(data);
                    muestraDatos(data, lista);
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

function borrar() {

    console.clear();
        console.log('borrado completado ');
        
        document.querySelector('div > ol').remove();
    /*let borrarLista = document.querySelector('#borrar');
    borrarLista.addEventListener('click', () => {

        console.clear();
        console.log('borrado completado ');
        document.querySelector('div > ol').remove();


    })*/

}