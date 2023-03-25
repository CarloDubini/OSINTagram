const {Router} = require('express')
const {db}= require('../firebase')

const router = Router();


//-------------------GETTS y POSTS---------------
router.get('/',async (req,res) =>{
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    ordenarAlfabeticamente(lista);
    // coger la foto para la valoracion
    const fotovalQuerySnapshot = await db.collection('fotoval').get();
    const fotoval = fotovalQuerySnapshot.docs.map((doc) => doc.data().link);

    res.render('main',{taskList: lista, fotoval:fotoval})
})


router.get('/publicacion:id', async (req,res) =>{
    //en vez de lista yo quiero datos[id]
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    ordenarAlfabeticamente(lista);

    res.render('main',{publicacion: lista})
})
//----------------VER CADA PUBLICACION-------------
router.get('/publicacion/:id', async (req,res) =>{

    let id = req.params.id
    const peticion = await db.collection('Publicaciones').doc(id).get()
    const publicacion = {id:id, datos : peticion.data()}
    console.log("--------------------HE CLICKADO EN LA PUBLICACION:---------------------")
    console.log(publicacion)
    let mensaje = mostrarMensajeDeReporte(publicacion.datos.reportes)
    console.log('reportes:',publicacion.datos.reportes,'msg:',mensaje)
    res.render('publicacion',{publicacion, mensaje}) 
})
function mostrarMensajeDeReporte(numeroReportes){
    console.log('Hola');
    let mensaje = "";
    if(numeroReportes >= 10){
        mensaje = 'Esta publicacion ha sido reportada por varios usuarios y puede ser falsa'
    }
    return mensaje;
}
//----------------REPORTAR-------------
router.get('/reportar/:id', async (req,res) =>{

    let id = req.params.id
    const peticion = await db.collection('Publicaciones').doc(id).get()
    const publicacion = {id:id, datos : peticion.data()}
    
    res.render('publicacion',{publicacion})
})
//----------------BUSCAR POR PALABRA CLAVE-------------
router.get('/search', async (req,res) =>{

    const palabraBuscada = req.query.searchInput;
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))

    const fotovalQuerySnapshot = await db.collection('fotoval').get();
    const fotoval = fotovalQuerySnapshot.docs.map((doc) => doc.data().link);
    const resultado = await buscarPorPalabraClave(palabraBuscada, lista)

    res.render('main',{taskList: resultado, fotoval:fotoval});
})

//-----------FUNCIONES VARIAS--------------
async function obtenerDatosPorTitulo(titulo,lista){  
    var encontrado = false;
    var publicacion;
    if (lista && lista.length > 0) {
        lista.forEach((elemento) => {
            if(elemento.titulo === titulo){
                publicacion = elemento;
                encontrado = true;
            }
        });
    } else {
        console.log('La lista de publicaciones está vacía o no está definida.');
    }

    if (!encontrado) {
        console.log(`La publicacion con titulo: ${titulo} no se encontró`);
    } else {
        console.log(`Los datos de la publicacion con titulo: ${titulo} son:\n[\n{ Id:${publicacion.id}}\n{ Titulo:${publicacion.titulo}}\n{ Localizacion:${publicacion.localizacion}}\n{ Descripcion:${publicacion.descripcion}}\n{ Imagen:${publicacion.imagen}}\n]`);
    }
    
    return publicacion;
}
//Prueba para los Test Unitarios
async function pruebaDatosPorTítulo(lista){
    try {
        await obtenerDatosPorTitulo('Tanque en la Universidad Complutense',lista);
        await obtenerDatosPorTitulo('Asesinato en Aluche',lista);
    } catch (error) {
        console.log(error);
    }
}
//Buscar por palabra clave
async function buscarPorPalabraClave(palabra, lista) {
    var encontrado = false;
    var listaResultado = [];
    let insensibilizador1 = "";
    let insensibilizador2 = "";

    palabra = palabra.toUpperCase();

    if (lista && lista.length > 0) {
        lista.forEach((elemento) => {
            if(elemento.titulo && elemento.descripcion){
                insensibilizador1 = elemento.titulo.toUpperCase();
                insensibilizador2 = elemento.descripcion.toUpperCase();
                if(insensibilizador1.includes(palabra) || insensibilizador2.includes(palabra)){  
                    listaResultado.push(elemento);
                    encontrado = true;
                }
            }
        });
    }
    else {
        console.log('La lista de publicaciones está vacía o no está definida.');
    }

    if (!encontrado) {
        console.log(`No se ha encontrado ninguna publicacion con la palabra clave: ${palabra}`);
    } 

    return listaResultado;
}
async function pruebaBusquedaPorPalabraClave(lista){
    try {
        await buscarPorPalabraClave('Lugansk',lista);
        await buscarPorPalabraClave('Embid',lista);
    } catch (error) {
        console.log(error);
    }
}
async function ordenarAlfabeticamente(lista){
    lista.sort((a, b) => a.titulo.localeCompare(b.titulo))
    return lista;
}

//Vista reportar
function mostrarMensaje(mensaje) {
    var mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.innerHTML = mensaje;
  }

//Funciones para comprobar

module.exports = {router,ordenarAlfabeticamente,
    mostrarMensaje,
    buscarPorPalabraClave,
    obtenerDatosPorTitulo,
    pruebaDatosPorTítulo,
    pruebaBusquedaPorPalabraClave,
    mostrarMensajeDeReporte,
};
