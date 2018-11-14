// C:\projetoSere6\app\models\layer.js

var mongoose = require('mongoose');

module.exports = function() {
  var schema = mongoose.Schema({
    nome: { 
      type: String, 
      required: true
    }, 
    
    layers: {
      type: String, 
      required: true, 
    }, 
    
    descricao: {
      type: String,
      required: true,
    },
    
    url: { 
      type:String,
      required: true,
    },

    projection:{
      type: String,
      require: true,
      index:{
          unique:true
      }
    }
});

  //Retorna um MODEL criado a partir do nosso SCHEMA
  return mongoose.model('Layer', schema);
};