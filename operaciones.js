function operar(i1, op, i2){
	let res;

	switch (op){
		case "+":
			res = i1+i2;
			break;
		default:
			break;
	}
	return (isNaN(res) || res === undefined) ? "Debe introducir valores válidos" : res;
 

}

  module.exports = operar;