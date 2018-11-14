// C:\projetoSere6\app\controllers\layer.js

module.exports = function (app) {
    //guardando uma referência para o Model na variável Layer
    var Layer = app.models.layer;
  
    var controller = {}
  
    controller.listaLayers = function(req, res) {
      //LISTAMOS TODOS OS Layers CADASTRADOS 
      //CHAMAMOS O POPULATE ANTES DE RETORNARMOS O PROMISSE, ISTO É, ANTES DA CHAMADA A exec()

      //Layer.find().populate('emergencia').exec() //COMENTEI ESSA LINHA
                                                   //e adicionei a linha de baixo
      Layer.find().populate().exec() 
      .then(
        function(layers) {
           res.json(layers);  //um CALLBACK de SUCESSO
                                //retorna uma lista de Layers no formato JSON
                                //O Express possuí a função 'res.json' especializada nesse tipo de dado
         },
         function(erro) {       //um CALLBACK de ERRO
           console.error(erro)
           res.status(500).json(erro);
         } 
      );    
    };
    
    //Buscando um Layer pelo o seu ID
    controller.obtemLayer = function(req, res) {
      var _id = req.params.id;
      Layer.findById(_id).exec()
      .then(
        function(layer) {
          if (!layer) throw new Error("Layer não encontrado");
          res.json(layer); 
        }, 
        function(erro) {
          console.log(erro);
          res.status(404).json(erro); 
        }
      );    
    };
  
    //Removendo um layer
    controller.removeLayer = function(req, res) { 
      var _id = req.params.id;
      Layer.remove({"_id" : _id}).exec()
      .then(
        function() {
          res.end();  //ESTÁ DIFERENTE DO MOSTRADO NO LIVRO. NO LIVRO ESTÁ ASSIM: res.status(204).end();
        }, 
        function(erro) {
          return console.error(erro);
        }
      );
    };
  
    //Atualizando layer ou DOCUMENTOS
    controller.salvaLayer = function(req, res) {
      var _id = req.body._id;
      //testando por UNDEFINED
      req.body.emergencia = req.body.emergencia || null;
      //Utilizaremos a função 'Layer.findByIdAndUpdate()' para atualizar o LAYER
      if(_id) {
       Layer.findByIdAndUpdate(_id, req.body).exec()
       .then(
        function(layer) {
          res.json(layer);
        }, 
        function(erro) {
          console.error(erro)
          res.status(500).json(erro);
        }
       );
      } else { //Implementando um ELSE que adicionará um NOVO LAYER através de Layer.create()
        Layer.create(req.body)
        .then(
          function(layer) {
            res.status(201).json(layer);
          }, 
          function(erro) {
            console.log(erro);
            res.status(500).json(erro);
          }
        );
      }
    };
  
    return controller;
  };