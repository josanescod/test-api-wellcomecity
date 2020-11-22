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


window.onload = () => {

    console.log('cargando script');

    listarUsuarios();
    listarComentarios();
    borrar();

}


function listarUsuarios() {

    let usuarios = document.querySelector('#usuarios');
    usuarios.addEventListener('click', () => {
        console.log('mostrar usuarios')

        let url = 'https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/usuarios'
        let request = new Request(url, {
            method: 'GET',



        });

        //llamada a la api para devolver los usuarios
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
                        console.log(data);
                        muestraDatos(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    })

}

function listarComentarios() {

    let usuarios = document.querySelector('#comentarios');
    usuarios.addEventListener('click', () => {
        console.log('mostrar comentarios')

        let url = 'https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/usuarios'
        let request = new Request(url, {
            method: 'GET',



        });

        //llamada a la api para devolver los usuarios
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
                        console.log(data);
                        muestraDatos(data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    })

}


function muestraDatos(data) {

    /*data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });*/
    let listView = document.createElement('ol');
    for (var i = 0; i < data.length; i++) {
        let listViewItem = document.createElement('li');
        listViewItem.appendChild(document.createTextNode(data[i]['id'] + ':' + data[i]['nombre']))
        listView.appendChild(listViewItem)
        //console.log(data[i]['id']+':'+data[i]['nombre'])
    }

    document.querySelector('#lista').appendChild(listView);
    //let newDIv = document.createElement('div');


}

function borrar() {
    let borrarLista = document.querySelector('#borrar');
    borrarLista.addEventListener('click', () => {
        //console.log('borrando usuarios');
        document.querySelector('div > ol').remove();
        //console.log(listado)

    }
    )
}