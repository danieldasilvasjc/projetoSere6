// C:\projetoSere6\app\routes\layer.js

module.exports = function (app) {
    var controller = app.controllers.layer;
    //nova Rota entra aqui como POST
    //para um mesmo identificador, podemos associar diferentes verbos HTTPs
    app.route('/layers')
        .get(controller.listaLayers)
      .post(controller.salvaLayer); 
      
    //cria-se a rota para a EXCLUSÃO DE LAYERS utilizando o identificador '/layers'
    //para um mesmo identificador, podemos associar diferentes verbos HTTPs
    app.route('/layers/:id')
      .get(controller.obtemLayer)
      .delete(controller.removeLayer);
  };