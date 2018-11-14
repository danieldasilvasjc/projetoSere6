//C:\projetoSere6\consulta.js

var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ObjectID de algum layer existente
//var _idProcurado = new ObjectID('53ee689e89bd201218944bba');

var _idProcurado = new ObjectID('5beb31518c663df32753224a'); //ObjetcID existente


MongoClient.connect('mongodb://127.0.0.1:27017/projetosere', 
	function(erro, db) {
		if(erro) throw err;		
		db.collection('projetosere').findOne({_id : _idProcurado}, 
			function(erro, layer) {
				if(erro) throw err;
				console.log(layer);
			}
		);	
	}
);