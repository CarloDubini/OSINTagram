const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerPublicacionPorID}  = require('OSINTagram/src/Controller/tests.js');

let lista = [];
beforeAll(async () => {
    lista = [
        {
            id: "12324",
            titulo: "Juan Embid se calla durante 5 minutos",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/photo_5832450131113394442_y.jpg?alt=media&token=d2173186-4187-41b8-9bc7-941a6dee88e6",
            descripcion: "un dia duro en la oficina",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 3.3,
            reportes: 10,
            usuario: "anonimo"
        },
        {
            id: "CKqS9fC51z7IsVKj7dB6",
            titulo: "OSINTagram en quiebra",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/Empresa-quebrada.jpg?alt=media&token=33a921b5-100b-4539-9924-7d4d4d09b66d",
            descripcion: "Osintagram se ha quebrado tras la perdida de nuestro querido Gabriel",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes: 2,
            usuario: "anonimo"
        },
        {
            id: "IwWoulHSw7v7sxAHdOn5",
            titulo: "Tanque en la Universidad Complutense",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/militares-del-ejercito-danes-en-tanques-leopard.jpeg?alt=media&token=46780d8c-c976-4a18-857b-c88884bc119c",
            descripcion: "Hay un tanque parado en frente de la puerta principal de la Facultad de Informática de la Universidad Complutense. Hay militares cerca, pero no se sabe el motivo por el cual este ha sido movilizado.",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes:10,
            usuario: "victor"
        }
      ];
}, 15000);

test('Comprobar no hay errores en la peticion del usuario con un Id Correcto', async () => {
    let pasaTest = true;
    try {
      id = 'IwWoulHSw7v7sxAHdOn5';
      publicacion = obtenerPublicacionPorID(id,lista);
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
  }, 20000);
test('Comprobar se recibe bien el usuario con la peticion con un Id Correcto', async () => {
    let pasaTest = true; let datos = {}; let publicacion = {}; 
    datos.usuario ='victor';
    try {
        id = 'IwWoulHSw7v7sxAHdOn5';
        publicacion = obtenerPublicacionPorID(id,lista);
    } catch (error) {
      pasaTest = false;
    }
    pasaTest = pasaTest && (datos.usuario == publicacion.usuario);
    expect(pasaTest).toBe(true);
  }, 20000);

  
