const { TestWatcher } = require("jest");
const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {buscarPorPalabraClave,mostrarMensajeDeReporte} = require('OSINTagram/src/Controller/publicacionController.js');
const {longitudLista,titulosVacios} = require('OSINTagram/src/Controller/tests.js')

let lista = {};
jest.setTimeout(43000);
beforeAll(async () => {
     // Añadir un nuevo elemento que vamos a comprobar
     const res = await db.collection('Publicaciones').doc('pr1').set({ 
        titulo: "Estamos haciendo test",
        descripcion: "El grupo de desarrollo esta elaborando los test",
        localizacion: "Calle de la pantomina",
        imagen: "https://cdn.bizneo.com/blog/wp-content/uploads/2019/05/pruebas-psicometricas.jpg",
        reportes: 0,
        valoracion: 5.0
    });
    // Obtener la lista
    const querySnapshot = await db.collection('Publicaciones').get();
    lista = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}, 15000);
test('Comprobar que se muestra de una publicacion en la lista, que se pueda buscar y que se puede mostrar la publicacion, su reporte y su valoracion.', async () =>{
    let pasaTest = true;
    //listar Publicacion
    pasaTest = pasaTest && await titulosVacios(lista);
    if(await longitudLista(lista)>0){
        pasaTest = pasaTest && true;
    }else{
        pasaTest = false;
    }
    //buscar Publicacion
    let prueba = await buscarPorPalabraClave('test', lista)
    if(prueba[0].titulo == "Estamos haciendo test"){
        pasaTest = pasaTest && true;
    }else{
        pasaTest = false;
    }
    prueba = await buscarPorPalabraClave('grupo', lista)
    if(prueba[0].titulo == "Estamos haciendo test"){
        pasaTest = pasaTest && true;
    }else{
        pasaTest = false;
    }
    //mostrar Publicacion
    const peticion = await db.collection('Publicaciones').doc("pr1").get()
    publicacion = {id:"pr1", datos : peticion.data()}
    pasaTest = pasaTest && ("Estamos haciendo test" == publicacion.datos.titulo) 
    && ("El grupo de desarrollo esta elaborando los test" == publicacion.datos.descripcion)
    && ("Calle de la pantomina" == publicacion.datos.localizacion) && ("https://cdn.bizneo.com/blog/wp-content/uploads/2019/05/pruebas-psicometricas.jpg" == publicacion.datos.imagen);
    //mostrar Valoracion
    pasaTest = pasaTest && publicacion.datos.valoracion == 5.0;
    //mostrar Reporte
    if(await mostrarMensajeDeReporte(publicacion.datos.reportes) == ""){
        pasaTest = pasaTest &&  true;
    }
    else{
        pasaTest = false;
    }
    publicacion.datos.reportes = 10;
    if(await mostrarMensajeDeReporte(publicacion.datos.reportes) == "Esta publicacion ha sido reportada por varios usuarios y puede ser falsa"){
        pasaTest = pasaTest &&  true;
    }
    else{
        pasaTest = false;
    }
    expect(pasaTest).toBe(true)
}, 30000)
afterAll(async () => {
    // Eliminar la publicación de la base de datos
    await db.collection('Publicaciones').doc("pr1").delete();
});



 
  


