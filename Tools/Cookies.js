// <reference path="cookies.js" />
// ==================================================
// Versión: 	1.0.0
// ==================================================
// Autor: 		JAlberto-Coder
// Fecha: 		22-10-2021
// Descripción:	Funciones para el manejo de cookies, englobadas en una variable
// ==================================================
var objCookie = {
	Existe: function (cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}

			if (c.indexOf(name) == 0 && (name.length != c.length))
				return true;
		}
		return false;
	},
	Eliminar: function (cname) {
		objCookie.Nueva(cname, "", -1);
	},
	Nueva: function (cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		let expires = "expires=" + d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
	Obtener: function (cname) {
		let name = cname + "=";
		let ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
};