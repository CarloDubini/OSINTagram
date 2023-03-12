const {Router} = require('express')
const {db}= require('../firebase')

const router = Router();

router.get('/',async (req,res) =>{
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    console.log(lista)

    res.render('main',{taskList: lista})
})
function ordenarAlfabeticamente(lista){
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