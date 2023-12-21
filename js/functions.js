"use strict"

function GetFormatoFecha(cadenaFecha) {
    try {
        if (IsNotNullOrEmpty(cadenaFecha)) {
            var arrayFecha = cadenaFecha.split('/');
            return arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0];
        } 
        return "";
    } catch {
        return "";
    }
}

function TogglePassword(fieldId, iconId) {
    var passwordField = document.getElementById(fieldId);
    var passwordIcon = document.getElementById(iconId);
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        passwordIcon.classList.remove('fa-eye');
        passwordIcon.classList.add('fa-eye-slash');
    } else {
        passwordField.type = 'password';
        passwordIcon.classList.remove('fa-eye-slash');
        passwordIcon.classList.add('fa-eye');
    }
}