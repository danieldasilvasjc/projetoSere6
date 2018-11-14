// C:\projetoSere6\app\models\contato.js

var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    nome: { 
      type: String, 
      required: true
    }, 
    email: {
      type: String, 
      required: true, 
      index: {
        unique: true
      }
    }, 
    emergencia: {
      type: mongoose.Schema.ObjectId, 
      ref: 'Contato' 
    }
  });

  //Retorna um MODEL criado a partir do nosso SCHEMA
  return mongoose.model('Contato', schema);
};