// C:\estudoMean\cap-07\app\controllers

module.exports = function (app) {
  //guardando uma referência para o Model na variável Contato
  var Contato = app.models.contato;

  var controller = {}

  controller.listaContatos = function(req, res) {
    //LISTAMOS TODOS OS Contatos CADASTRADOS 
    //CHAMAMOS O POPULATE ANTES DE RETORNARMOS O PROMISSE, ISTO É, ANTES DA CHAMADA A exec()
    Contato.find().populate('emergencia').exec() 
    .then(
      function(contatos) {
         res.json(contatos);  //um CALLBACK de SUCESSO
                              //retorna uma lista de Contatos no formato JSON
                              //O Express possuí a função 'res.json' especializada nesse tipo de dado

       },
       function(erro) {       //um CALLBACK de ERRO
         console.error(erro)
         res.status(500).json(erro);
       } 
    );    
  };
  
  //Buscando um Contato pelo o seu ID
  controller.obtemContato = function(req, res) {
    var _id = req.params.id;
    Contato.findById(_id).exec()
    .then(
      function(contato) {
        if (!contato) throw new Error("Contato não encontrado");
        res.json(contato);  //NÃO TINHA O PONTO E VÍRCULA   
      }, 
      function(erro) {
        console.log(erro);
        res.status(404).json(erro); //NÃO TINHA O PONTO E VÍRCULA
      }
    );    
  };

  //Removendo um CONTATO
  controller.removeContato = function(req, res) { 
    var _id = req.params.id;
    Contato.remove({"_id" : _id}).exec()
    .then(
      function() {
        res.end();  //ESTÁ DIFERENTE DO MOSTRADO NO LIVRO. NO LIVRO ESTÁ ASSIM: res.status(204).end();
      }, 
      function(erro) {
        return console.error(erro);
      }
    );
  };

  //Atualizando CONTATO ou DOCUMENTOS
  controller.salvaContato = function(req, res) {
    
    var _id = req.body._id;

    //testando por UNDEFINED
    req.body.emergencia = req.body.emergencia || null;

    //Utilizaremos a função 'Contato.findByIdAndUpdate()' para atualizar o CONTATO
    if(_id) {
     Contato.findByIdAndUpdate(_id, req.body).exec()
     .then(
      function(contato) {
        res.json(contato);
      }, 
      function(erro) {
        console.error(erro)
        res.status(500).json(erro);
      }
     );
    } else { //Implementando um ELSE que adicionará um NOVO CONTATO através de Contato.create()
      Contato.create(req.body)
      .then(
        function(contato) {
          res.status(201).json(contato);
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