const {Router} = require('express')
const {db}= require('../firebase')

const UserRouter = Router();

UserRouter.get('/user/:id', async (req,res) =>{
    let id = req.params.id
    const peticion = await db.collection('Usuarios').doc(id).get()
    const usuario = {id:id, datos : peticion.data()}
    console.log("--------------------HE CLICKADO EN EL USUARIO:---------------------")
    console.log(usuario)
    res.render('user',{usuario}) 
})

module.exports = {UserRouter}