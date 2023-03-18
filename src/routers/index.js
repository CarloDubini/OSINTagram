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
    console.log(lista);
    //await pruebaDatosPorTítulo(lista); //comprobacion de que funciona correctamente
    //await pruebaBusquedaPorPalabraClave(lista); //comprobacion de que funciona correctamente
    res.render('main',{taskList: lista})
})


router.get('/publicacion:id', async (req,res) =>{
    //en vez de lista yo quiero datos[id]
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    ordenarAlfabeticamente(lista);
    console.log(lista)

    res.render('main',{publicacion: lista})
})
//----------------VER CADA PUBLICACION-------------
router.get('/publicacion/:id', async (req,res) =>{
    console.log("Entrado aqui")

    let id = req.params.id
    const peticion = await db.collection('Publicaciones').doc(id).get()
    const publicacion = {id:id, datos : peticion.data()}
    console.log("--------------------HE CLICKADO EN LA PUBLICACION:---------------------")
    console.log(publicacion)
    res.render('publicacion',{publicacion})
})
//----------------PONER QUE TODOS LOS TITULOS SOLO PUEDAN SER EN MAYUSCULAS AL CREARLOS PARA QUE SEA MAS FACIL DE BUSCAR
//----------------BUSCAR POR PALABRA CLAVE-------------
router.get('/search', async (req,res) =>{
    console.log("Entrado aqui")

    const palabraBuscada = req.query.searchInput.toUpperCase();
    const resultados= await db.collection('Publicaciones').where('titulo', '>=', palabraBuscada).where("titulo", "<=", palabraBuscada + "\uf8ff").get();
    const taskList = [];
    resultados.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        taskList.push(data);
    });
    console.log(taskList)
    res.render('main',{taskList: taskList});
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
            if(elemento.titulo){
                insensibilizador1 = elemento.titulo.toUpperCase();
                //insensibilizador2 = elemento.descripcion.toUpperCase();
                if(insensibilizador1.includes(palabra)){  // poner || insensibilizador2.includes(palabra)
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
    else {
        console.log(`Los datos de la publicacion con la palabra clave: ${palabra} son:\n[\n`);
        listaResultado.forEach((elemento) => {
            console.log(`{ Id:${elemento.id}}\n{ Titulo:${elemento.titulo}}\n{ Localizacion:${elemento.localizacion}}\n{ Descripcion:${elemento.descripcion}}\n{ Imagen:${elemento.imagen}}\n`);
        });
        console.log(`]`);
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

//Funciones para comprobar

module.exports = {router,ordenarAlfabeticamente};