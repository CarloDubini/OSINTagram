// Jest es el módulo que te permite hacer las pruebas. gracias a esto existe test(), expect(..).toBe()
const { TestWatcher } = require("jest");
//operar es el fichero donde está la función de la suma. gracias a eso, tu puedes poner operar(x, "simbolo", y) y te devuelve el resultado.
const operar = require("../../operaciones.js");

//SUMA
test('sumar 1 + 2 es igual a 3', () =>{
    
    expect(operar(1,"+",2)).toBe(3);
});

test('sumar 1 + (-1) es igual a 0', () =>{
    expect(operar(1,"+",-1)).toBe(0);
});

test('sumar a + 2 es igual a Debe introducir valores válidos', () =>{
    expect(operar("a","+",2)).toBe("Debe introducir valores válidos");
});

