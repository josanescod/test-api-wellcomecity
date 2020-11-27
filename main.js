import { initmodulo } from './test01.js';

const buttons = ['usuarios', 'comentarios', 'emails', 'experiencias', 'fotos', 'hoteles', 'ofertas', 'perfiles',
    'roles', 'servicios', 'tipos', 'imagenes', 'imgexp'];

const show = 'mostrar'
const load = 'cargar'
const ArrayImgExp = []

window.onload = () => {
    console.log(initmodulo)
    loadButtons();
}

function loadButtons() {
    //botones peticiones
    for (let b of buttons) {
        let button = document.querySelector('#' + b);
        if (button) {
            button.addEventListener('click', () => {
                console.log(`mostrar ${b}`)
                if (b == 'imagenes') {
                    mostrarImagenes();
                    borrar();
                } else if (b == 'imgexp') {

                    mostrarImgExp();
                    borrar();


                }
                else {
                    listar(b, show);
                    borrar();
                }
            })
        }
    }
    //boton de borrar
    let borrarLista = document.querySelector('#borrar');
    borrarLista.addEventListener('click', () => {
        borrar();
    })
    //selector experiencias
    let selectexp = document.querySelector('#selectexp');
    //primero una peticion a experiencias para cargar el selector con los datos
    listar('experiencias', load);
    //crear el evento change 
    selectexp.addEventListener('change', () => {
        let svalue = selectexp.value;
        console.log(`mostrar experiencia ${svalue}`)
        listar('experiencias', show, svalue);
        borrar()
    })
}

function listar(lista, action, param = 0) {
    if (param == 0) {
        var url = `https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/${lista}`
        console.log(url)
    } else {
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
                        muestraDatos(data, lista, param);

                    } else {
                        cargaDatos(data, lista);
                    }

                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });


}

function muestraDatos(data, lista, param = 0) {
    /*data.forEach(obj => {
        Object.entries(obj).forEach(([key, value]) => {
            console.log(`${key} ${value}`);
        });
        console.log('-------------------');
    });*/
    console.log(data)
    if (param != 0) {

        muestraDatosParametro(data, lista);

    } else {
        let listView = document.createElement('ol');
        listView.setAttribute('id', 'orderedList');
        for (let d in data) {
            let listViewItem = document.createElement('li');
            if (lista == 'usuarios') {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' usuario:' + data[d]['nombre']))

            }
            else if (lista == "comentarios") {
                listViewItem.appendChild(document.createTextNode(
                    data[d]['fecha'] + ' ' +
                    data[d]['titulo'] + ' ' +
                    data[d]['comentario']
                ))
            }
            else if (lista == "emails") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'direccion: ' + data[d]['direccion'] + ' ' +
                    'telefono: ' + data[d]['telefono'] + ' ' +
                    'mensaje: ' + data[d]['mensaje']
                ))
            }
            else if (lista == "experiencias") {
                console.log(listViewItem);
                listViewItem.appendChild(document.createTextNode(

                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'descripcion: ' + data[d]['descripcion'] + ' ' +
                    'puntuacion: ' + data[d]['puntuacion'] + ' ' +
                    'precio: ' + data[d]['precio']
                ))
                console.log(listViewItem);

            }
            else if (lista == "fotos") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre']

                ))

            }
            else if (lista == "hoteles") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'direccion: ' + data[d]['direccion']
                ))
            }
            else if (lista == "ofertas") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'codigo: ' + data[d]['codigo'] + ' ' +
                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'descripcion: ' + data[d]['descripcion']
                ))
            }
            else if (lista == "perfiles") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre']
                ))
            }
            else if (lista == "roles") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre']
                ))
            }
            else if (lista == "servicios") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'descripcion: ' + data[d]['descripcion'] + ' ' +
                    'precio: ' + data[d]['precio']
                ))
            }
            else if (lista == "tipos") {
                listViewItem.appendChild(document.createTextNode(
                    'id: ' + data[d]['id'] + ' ' +
                    'nombre: ' + data[d]['nombre'] + ' ' +
                    'perfiles: '
                ))
                /*let perfiles = data[d]['perfiles']
                for (var j = 0; j < perfiles.length; j++) {
                    console.log('id: ' + perfiles[j]['id'] + ' ' + 'nombre: ' + perfiles[j]['nombre'])
                    listViewItem.appendChild(document.createTextNode(
                        ' id: ' + perfiles[j]['id'] + ' ' + 'nombre: ' + perfiles[j]['nombre'] + ''
                    ))
                }*/
            }
            else {
                console.log('listado no disponible')
            }
            listView.appendChild(listViewItem)
        }
        document.querySelector('#lista').appendChild(listView)
    }
}

function muestraDatosParametro(data, lista) {
    if (lista == "experiencias") {
        let listView = document.createElement('ol');
        listView.setAttribute('id', 'orderedList');
        let listonlyItem = document.createElement('li');
        listonlyItem.appendChild(document.createTextNode(
            'id: ' + data['id'] + ' ' +
            'nombre: ' + data['nombre'] + ' ' +
            'descripcion: ' + data['descripcion'] + ' ' +
            'puntuacion: ' + data['puntuacion'] + ' ' +
            'precio: ' + data['precio']
        ))
        listView.appendChild(listonlyItem)
        document.querySelector('#lista').appendChild(listView)

    }
}

function cargaDatos(data, lista) {
    if (lista == 'experiencias') {
        //primer elemento Elige una experiencia
        let optionItem = document.createElement('OPTION');
        optionItem.setAttribute('selected', true);
        optionItem.setAttribute('hidden', true);
        let textoptionItem = document.createTextNode('Elige una experiencia');
        optionItem.appendChild(textoptionItem);
        document.querySelector('#selectexp').appendChild(optionItem);


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
    let orderedList = document.querySelector('#orderedList');
    if (orderedList) {
        orderedList.remove();
        //console.clear();    
    }
}


function mostrarImagenes() {
    var url = `https://cors-anywhere.herokuapp.com/https://picsum.photos/v2/list?page=2&limit=5`

    console.log(url)
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
                    console.log(data)
                    let listView = document.createElement('ol');
                    listView.setAttribute('id', 'orderedList');
                    for (let d in data) {
                        let listViewItem = document.createElement('li');
                        listViewItem.style.paddingLeft = '40%';
                        let image = document.createElement('IMG');
                        image.style.width = '100px';
                        image.style.height = '75px';
                        image.src = `${data[d]['download_url']}`
                        listViewItem.appendChild(image);
                        listView.appendChild(listViewItem)
                    }
                    document.querySelector('#lista').appendChild(listView)


                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}




/*
1.- peticion servicios
2.- peticion imagenes
3.- crear array imgexp
4.- imprimir array
*/
function mostrarImgExp() {
    
    var url = `https://cors-anywhere.herokuapp.com/https://welcomcity.herokuapp.com/test/experiencias`
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
                    for (let d in data) {
                        ArrayImgExp.push(data[d])
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });

    var url = `https://cors-anywhere.herokuapp.com/https://picsum.photos/v2/list?page=2&limit=10`
    let request2 = new Request(url, {
        method: 'GET',
    })
    //llamada a la api 
    fetch(request2)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Ha habido algun problema. Status Code: ' +
                        response.status);
                    return;
                }
                // respuesta peticion
                response.json().then(function (data) {
                    for (let d in data) {
                        ArrayImgExp[d].download_url = data[d]['download_url']
                    }
                    console.log(ArrayImgExp)
                    let listView = document.createElement('ol');
                    listView.setAttribute('id', 'orderedList');

                    for (let e in ArrayImgExp) {
                        let listViewItem = document.createElement('li');
                        //listViewItem.style.paddingLeft = '2%';

                        let title = document.createElement('H3');
                        let text = document.createTextNode(ArrayImgExp[e]['nombre']
                        )
                        title.appendChild(text);
                        listViewItem.appendChild(title);


                        let image = document.createElement('IMG');
                        image.style.width = '100px';
                        image.style.height = '75px';
                        image.src = `${ArrayImgExp[e]['download_url']}`
                        listViewItem.appendChild(image);

                        let description = document.createElement('P');
                        let text2 = document.createTextNode(
                            ArrayImgExp[e]['descripcion']
                        );
                        description.appendChild(text2)
                        listViewItem.appendChild(description);



                        listView.appendChild(listViewItem)
                    }
                    document.querySelector('#lista').appendChild(listView)

                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}