"use strict"

var modalTitleComponent = {
    create: function (path) {
        let elementos = document.getElementsByClassName("tituloModal");

        if (elementos.length > 0) {
            let primerElemento = elementos[0];
            let imagen = document.createElement('img');
            imagen.src = path;
            imagen.alt = "Titulo";
            imagen.style.maxWidth = "28px";

            let contenidoExistente = primerElemento.firstChild;
            primerElemento.insertBefore(imagen, contenidoExistente);
        }
    }
};
