const { Router } = require('express');
const { db } = require('OSINTagram/src/firebase');
const { obtenerValoracionPorID } = require('../Controller/tests');

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
            reportes: 10
        },
        {
            id: "CKqS9fC51z7IsVKj7dB6",
            titulo: "OSINTagram en quiebra",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/Empresa-quebrada.jpg?alt=media&token=33a921b5-100b-4539-9924-7d4d4d09b66d",
            descripcion: "Osintagram se ha quebrado tras la perdida de nuestro querido Gabriel",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes: 2
        },
        {
            id: "IwWoulHSw7v7sxAHdOn5",
            titulo: "Tanque en la Universidad Complutense",
            imagen: "https://firebasestorage.googleapis.com/v0/b/osintagram-be0cd.appspot.com/o/militares-del-ejercito-danes-en-tanques-leopard.jpeg?alt=media&token=46780d8c-c976-4a18-857b-c88884bc119c",
            descripcion: "Hay un tanque parado en frente de la puerta principal de la Facultad de Informática de la Universidad Complutense. Hay militares cerca, pero no se sabe el motivo por el cual este ha sido movilizado.",
            localizacion: "Calle del Prof. José García Santesmases, 9, 28040 Madrid",
            valoracion: 4.3,
            reportes:10
        }
      ];
}, 15000);

test('Comprobar que se recibe bien la valoración en la petición con un Id Correcto', async () => {
    let pasaTest = true;
    const valoracionEsperada = 4.3;
    try {
      const id = 'IwWoulHSw7v7sxAHdOn5';
      const valoracion = obtenerValoracionPorID(id,lista);
      pasaTest = valoracion === valoracionEsperada;
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que se recibe la valoración dentro de su rango del 1 al 5', async () => {
    let pasaTest = true;
    const valMin = 1;
    const valMax = 5;
    try {
      const id = 'IwWoulHSw7v7sxAHdOn5';
      const publicacion = obtenerValoracionPorID(id,lista);
      if(publicacion.valoracion < valMin || publicacion.valoracion > valMax){
        pasaTest = false;
        }
    } catch (error) {
      pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

// Comprobar que se recibe bien la valoración en la petición con un Id Correcto
test('Comprobar se recibe bien la valoración en la petición con un Id Correcto', async () => {
    let pasaTest = true; let datos = {}; let valoracion;
    datos.valoracion = 4.3;
    try {
        id = 'IwWoulHSw7v7sxAHdOn5';
        valoracion = obtenerValoracionPorID(id,lista);
    } catch (error) {
    pasaTest = false;
    }
    pasaTest = pasaTest && (datos.valoracion === valoracion);
    expect(pasaTest).toBe(true);
    }, 20000);

test('Comprobar que se recibe un objeto undefined en la peticion de la informacion con una valoración que no existe', async () => {
        let pasaTest = true;
        try {
          id = 'IwWoulHSw7v7sxAHdOn1';
          const valoracion = obtenerValoracionPorID(id,lista);
        } catch (error) {
          pasaTest = false;
        }
        expect(typeof valoracion).toBe("undefined");
    }, 20000);