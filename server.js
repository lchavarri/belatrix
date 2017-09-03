//0- Ejecutar en la línea de comando: 'npm install' (una única vez para descargue los paquetes 'Connect' y 'Serve-static')
//1- Compilar la aplicación: 'grunt build'
//2- Ejecutar en la línea de comando: 'node server.js'
var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(8082);
console.log('Open localhost:8082/index.html in your browser');