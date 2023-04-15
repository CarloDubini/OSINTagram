const {Router} = require('express')
const {db}= require('../firebase')
const {mostrarMensajeDeContraseñasNoIguales,
    mostrarMensajeDeUsuarioYaExiste, mostrarMensaje}= require('../Controller/userController.js')

const UserRouter = Router();

UserRouter.get('/user/:id', async (req,res) =>{
    let id = req.params.id
    const peticion = await db.collection('Usuarios').doc(id).get()
    const usuario = {id:id, datos : peticion.data()}
    console.log("--------------------HE CLICKADO EN EL USUARIO:---------------------")
    console.log(usuario)
    res.render('user',{usuario}) 
})

//-----------------REGISTRAR USUARIO-----------------
UserRouter.get('/registrar', (req,res) =>{
    let mensaje = "";
    res.render('registrarUsuario', {mensaje})
})

UserRouter.post('/registrar', async (req,res) =>{
    const {nombre, nombreUsuario, contraseña, contraseñaIgual} = req.body;
    const nuevoUsuario = {
        nombre,
        nombreUsuario,
        contraseña,
    }

    let mensaje = mostrarMensajeDeContraseñasNoIguales(nuevoUsuario.contraseña, contraseñaIgual)
    if(mensaje == ""){
        mensaje = mostrarMensajeDeUsuarioYaExiste(nuevoUsuario.nombreUsuario)
    }

    if(mensaje == ""){
        await db.collection('Usuarios').add(nuevoUsuario)
        mensaje = "Nuevo usuario creado correctamente"
    }
    res.render('registrarUsuario',{mensaje}) 
})

module.exports = {UserRouter}