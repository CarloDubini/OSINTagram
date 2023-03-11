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

router.get('/publicacion:id', async (req,res) =>{
    
    //en vez de lista yo quiero datos[id]
    const querySnapshot= await db.collection('Publicaciones').get()
    const lista =querySnapshot.docs.map(doc =>({
        id: doc.id,
        ...doc.data()
    }))
    console.log(lista)
    
    res.render('main',{publicacion: lista})
})


  module.exports = router;