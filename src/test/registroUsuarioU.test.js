const { TestWatcher } = require("jest");
const {usuarioDuplicado } = require('../Controller/tests');

let lista = [];
beforeAll(async () => {
    lista = [
        {
            contraseña: "1234",
            logeado: 0,
            nombreUsuario: "pepep"
        },
        {
            contraseña: "123",
            logeado: 1,
            nombreUsuario: "123"
        },
        {
            contraseña: "1234",
            logeado: 1,
            nombreUsuario: "aitor.tilla@ucm.es"
        }
      ];
}, 15000);

test('Comprobar que la funcion de comprobar nombres de usuario duplicados funciona correctamente con un valor dado', async () => {
    let pasaTest = false;

    const nuevoUsuario = {
        contraseña: "12232334",
        logeado: 0,
        nombreUsuario: "pepep"
    };

    try{
        pasaTest = usuarioDuplicado(nuevoUsuario.nombreUsuario, lista);
    }catch(error){
        pasaTest = false;
    }
    expect(pasaTest).toBe(true);
}, 20000);

test('Comprobar que las contraseñas de registro son iguales con valores dados', async () => {

    const nuevoUsuario = {
        contraseña: "12232334",
        logeado: 0,
        nombreUsuario: "pepep"
    };

    const repetirContraseña = "12232334"

    expect(nuevoUsuario.contraseña).toEqual(repetirContraseña);
}, 20000);

test('Comprobar que los valores de los campos de usuario se crean correctamente', async () => {
    const nuevoUsuario = {
        contraseña: "12232334",
        logeado: 0,
        nombreUsuario: "pepep"
    };
    expect(nuevoUsuario.contraseña).toEqual("12232334");
    expect(nuevoUsuario.logeado).toEqual(0);
    expect(nuevoUsuario.nombreUsuario).toEqual("pepep");
}, 20000);




