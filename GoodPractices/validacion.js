// ****************************************// Versión: 1.0// ****************************************// 16-10-2022 | JAlberto-Coder | Clase que contiene la mejor manera de realizar validaciones en JavaScrit// ****************************************var objValidacion = {	// Comparación de valores, que siempre sea de manera precisa con ===	comparar: (valor1, valor2) => {		return valor1 === valor2;	},	compararSwitch: (valor) {		// En este caso utilizar en el switch, utilizar el valor esperado de manera precisa		switch(valor) {// Caso en que se recibe un entero			case 10:				alert('Hola');		}	}};