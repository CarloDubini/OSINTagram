const {Router} = require('express')
const {db}= require('../firebase')

const router = Router();

router.get('/',async (req,res) =>{
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    ordenarAlfabeticamente(lista);
    console.log(lista);
    await pruebaDatosPorTítulo(lista); //comprobacion de que funciona correctamente
    res.render('main',{taskList: lista})
})
async function ordenarAlfabeticamente(lista){
    lista.sort((a, b) => a.titulo.localeCompare(b.titulo))
    return lista;
}
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
//ObtenerDatosPorTitulo
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
/*function search() {
    router.get('/main',async (req,res) =>{
        const querySnapshot= await db.collection('Publicaciones').get()
        const lista =querySnapshot.docs.map(doc =>({
            id: doc.id,
            ...doc.data()
        }))
        const searchText = document.getElementById('searchInput').value;
        const filters = new Map();

        lista.forEach((value, key) => {
            if(value.titulo.toLowerCase().includes(searchText.toLowerCase())){
                filters.set(key, value);
            }          
        });

        console.log(filters)
    
        res.render('main',{taskList: filters})
    })
}*/

//Funciones para comprobar
function tituloVacio(title){
    if(title === ""){
        return true;
    }
    return false;
}
function titulosVacios(lista){
    for(let i=0; i<lista.length;i++){
        if(tituloVacio(lista[i].titulo)) return false;
    }
    return true;
}
function longitudLista(lista){
    console.log(lista.length)
    return lista.length;
}
module.exports = {router,tituloVacio,titulosVacios,longitudLista,ordenarAlfabeticamente};