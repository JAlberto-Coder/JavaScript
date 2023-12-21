var objImagen = {
    Base64: "",
    Validar: function (idControlImg, imagenBase64, altura, anchura) {
        try {
            const { height, width } = objImagen.TamanioObtener(imagenBase64);

            if (altura === height && anchura === width) {
                objImagen.Mostrar(idControlImg, imagenBase64);
            } else {
                Mensaje(4, "La imagen no cumple con las dimensiones establecidas. ¿Desea redimencionar la imagen?", "Validación", "warning-48",
                    function () {
                        objImagen.Redimencionar(idControlImg, imagenBase64, altura, anchura);
                    });
            }
        } catch (e) {
            console.error(`Ocurrió un error: ${e}`);
        }
    },
    Mostrar: function (idControlImg, imagenBase64) {
        if (document.getElementById(idControlImg) !== null || imagenBase64.length !== 0)
            document.getElementById(idControlImg).src = imagenBase64;
        else
            Mensaje(1, "No se encoentro el div para colocar la imagen.", "Validación", "warning-48");
    },
    TamanioObtener: function (imagenBase64) {
        imagenBase64 = imagenBase64.replace("data:image/png;base64,", "");
        imagenBase64 = imagenBase64.replace("data:image/jpg;base64,", "");
        imagenBase64 = imagenBase64.replace("data:image/jpeg;base64,", "");

        const header = atob(imagenBase64.slice(0, 50)).slice(16, 24)
        const uint8 = Uint8Array.from(header, c => c.charCodeAt(0))
        const dataView = new DataView(uint8.buffer)

        return {
            width: dataView.getInt32(0),
            height: dataView.getInt32(4)
        }
    },
    Redimencionar: function (idControlImg, base64, newHeight, newWidth) {
        base64 = IsNotNullOrUndefined(base64) && base64.length > 0 ? base64 : "";
        newWidth = IsNotNullOrUndefined(newWidth) && jQuery.isNumeric(newWidth) ? newWidth : 0;
        newHeight = IsNotNullOrUndefined(newHeight) && jQuery.isNumeric(newHeight) ? newHeight : 0;

        try {
            const $image = new Image();
            $image.onload = function () {
                const $canvas = document.createElement("canvas");
                const ctx = $canvas.getContext("2d");
                $canvas.width = newWidth;
                $canvas.height = newHeight;
                ctx.drawImage($image, 0, 0, newWidth, newHeight);
                const dataUrl = $canvas.toDataURL();
                objImagen.Base64 = dataUrl;
                objImagen.Mostrar(idControlImg, objImagen.Base64);
            }
            $image.src = base64;
            objImagen.Mostrar(idControlImg, objImagen.Base64);
        } catch (e) {
            console.error(`Ocurrió un error: ${e}`);
        }
    }
};