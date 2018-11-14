// C:\projetoSere6\config\database.js

var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(uri);
	//informando o estado da conexão
	mongoose.connection.on('connected', function() {
	  console.log('Mongoose! Conectado em ' + uri);
	});

	//informando o estado da conexão
	mongoose.connection.on('disconnected', function() {
	  console.log('Mongoose! Desconectado de ' + uri);
	});

	//informando o estado da conexão
	mongoose.connection.on('error', function(erro) {
	  console.log('Mongoose! Erro na conexão: ' + erro);
	});

	//Garantindo que a conexão seja fechada quando a aplicação for terminada.
	//Vamos interagir com o OBJETO 'process' globalmente disponível pelo Node.js
	process.on('SIGINT', function() {
  	  mongoose.connection.close(function() {
        console.log('Mongoose! Desconectado pelo término da aplicação');
        //"0" Indica que a finalização ocorreu sem erro
        process.exit(0); 
      });
    });
}