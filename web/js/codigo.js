(function () {

    "use strict";

    var url = 'ws://' + window.location.host + '/WebSocketChat/chat',
            ws = new WebSocket(url),
            mensajes = document.getElementById('conversacion'),
            boton = document.getElementById('btnEnviar'),
            nombre = document.getElementById('usuario'),
            mensaje = document.getElementById('mensaje');

    ws.onopen = onOpen;
    ws.onclose = onClose;
    ws.onmessage = onMessage;
    boton.addEventListener('click', enviar);

    function onOpen() {
        console.log('conectado.');
    }

    function onClose() {
        console.log('desconectado.');
    }

    function  enviar() {
        var msg = {
            nombre: nombre.value,
            mensaje: mensaje.value
        };
        ws.send(JSON.stringify(msg));
    }

    function onMessage(e) {
        var obj = JSON.parse(e.data),
                msg = 'Nombre: ' + obj.nombre + ' dice: ' + obj.mensaje;
        mensajes.innerHTML += '<br/>' + msg;
    }

})(window, document, JSON);