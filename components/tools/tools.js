"use strict"

var tools = {
    uuidGenerate: function () {
        const timestamp = new Date().getTime();
        const [performanceNow = 0] = performance ? [performance.now() * 1000] : [];
        const UUID_PATTERN = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

        return UUID_PATTERN.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16;
            const randomNumber = (timestamp > 0)
                ? (timestamp + r) % 16 | 0
                : (performanceNow + r) % 16 | 0;
            const uuidDigit = (c === 'x') ? randomNumber : (randomNumber & 0x3 | 0x8);
            return uuidDigit.toString(16);
        });
    },
    codeExtract: function (code) {
        return IsNotNullOrEmpty(code) && code.includes('-')
            ? parseInt(code.split('-')[1][0], 10)
            : code;
    },
    formatNumber: (numero) => {
        const partesNumero = numero.toString().split(".");
        let parteEntera = partesNumero[0];
        const parteDecimal = partesNumero[1] || "";

        parteEntera = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        const numeroFormateado = parteDecimal
            ? parteEntera + "." + parteDecimal
            : parteEntera;

        return numeroFormateado;
    },
    copyToClipboard: function (text) {
        navigator.clipboard.writeText(text).then(function () {
            
        }).catch(function (err) {
            console.error('Error al copiar text: ', err);
        });
    }
};