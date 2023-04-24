const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {usuarioDuplicado } = require('../Controller/tests');

let lista = {};
beforeAll(async () => {
     // Añadir un nuevo elemento que vamos a comprobar
     const res = await db.collection('Usuarios').doc('pr1').set({ 
        contraseña: "QueTeVoteTxapote",
        logeado: 0,
        nombreUsuario: "PedroSanxe",
    });
    const querySnapshot = await db.collection('Usuarios').get();
    lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}, 15000);

test('Comprobar que la funcion de comprobar nombres de usuario duplicados funciona correctamente con un valor extraido de la base de datos', async () => {
    let pasaTest = false;
    try{
        id = "pr1";
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}
        pasaTest = await usuarioDuplicado(usuario.datos.nombreUsuario, lista);
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que los valores de los campos de usuario se crean correctamente en la base de datos', async () => {
    let pasaTest = true;
    try{
        id = 'pr1';
        const peticion = await db.collection('Usuarios').doc(id).get()
        const usuario = {id:id, datos : peticion.data()}

        expect(usuario.datos.contraseña).toEqual("QueTeVoteTxapote");
        expect(usuario.datos.logeado).toEqual(0);
        expect(usuario.datos.nombreUsuario).toEqual("PedroSanxe");

    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

afterAll(async () => {
    // Eliminar la publicación de la base de datos
    await db.collection('Usuarios').doc("pr1").delete();
});



