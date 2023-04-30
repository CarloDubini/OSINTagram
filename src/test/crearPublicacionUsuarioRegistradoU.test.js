const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const {obtenerPublicacionPorID}  = require('OSINTagram/src/Controller/tests.js');
const {criteriosCrearPublicacion}  = require('OSINTagram/src/Controller/publicacionController.js');

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
            usuario: "Ana"
        },
        {
            id: "CKqS9fC51z7IsVKj7dB6",
            titulo: "OSINTagram en quiebra",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/Empresa-quebrada.jpg?alt=media&token=33a921b5-100b-4539-9924-7d4d4d09b66d",
            descripcion: "Osintagram se ha quebrado tras la perdida de nuestro querido Gabriel",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes: 2,
            usuario: "pepe"
        },
        {
            id: "IwWoulHSw7v7sxAHdOn5",
            titulo: "Tanque en la Universidad Complutense",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/militares-del-ejercito-danes-en-tanques-leopard.jpeg?alt=media&token=46780d8c-c976-4a18-857b-c88884bc119c",
            descripcion: "Hay un tanque parado en frente de la puerta principal de la Facultad de Informática de la Universidad Complutense. Hay militares cerca, pero no se sabe el motivo por el cual este ha sido movilizado.",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes:10,
            usuario: "pepe"
        }
      ];
}, 15000);

describe("Creación de publicaciones", () => {
    test("Crear nueva publicación", async () => {
      // Simular datos de una nueva publicación
      const nuevaPublicacion = {
        titulo: "Nuevo título",
        localizacion: "Nueva localización",
        descripcion: "Nueva descripción",
        imagen: "Nueva imagen",
        reportes: 0,
        usuario: "pepe"
      };
      
      // Comprobar si los datos de la publicación creada coinciden con los datos enviados en la petición POST
      expect("Nuevo título").toEqual(nuevaPublicacion.titulo);
      expect("Nueva localización").toEqual(nuevaPublicacion.localizacion);
      expect("Nueva descripción").toEqual(nuevaPublicacion.descripcion);
      expect("Nueva imagen").toEqual(nuevaPublicacion.imagen);
      expect(0).toEqual(nuevaPublicacion.reportes);
      expect("pepe").toEqual(nuevaPublicacion.usuario);
    });
  });

  test("Comprobar criterios", async () => {
    let pasaTest = true;
    try{
      let { mensajes, error } = criteriosCrearPublicacion(lista[0].titulo, lista[0].descripcion, lista[0].localizacion)
      if(error){
        pasaTest = false;
      }
    }
    catch{
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
  });
