// C:\projetoSere6\public\js\controllers\LayerController.js

// O LayerController recebe via injeção o objeto $routeParams
// Vai ser acessando a propriedade $routeParams.layerId que teremos acesso ao parêmetro passado via URL
//injetamos "$routeParams" no CONTROLLER 
//injetamos "$resource" para que possamos popular os dados do formulário com suas informações
//realizando a troca a injeção de $resource pelo o nome do nosso serviço, 'Layer' - Alteração do ETAPA 5
angular.module('projetosere').controller('LayerController', function($scope, Layer, $routeParams) {
    //Se o ID do Layer for passado para o Sisema de Rotas do AngularJS
    if($routeParams.layerId) {
        //É acessando a propriedade $routeparams.layerId que temos acesso a URL
        Layer.get({id: $routeParams.layerId}, 
            function(layer) {
                $scope.layer = layer; 
            }, 
            function(erro) {
                $scope.mensagem = {
                  texto: 'Layer não existe. Novo layer.'
                };
            }
        );	
    } else {
        $scope.layer = new Layer();
    }

    //observação: Antes de criarmos a função SALVA, tem que criar o serviço, nesse caso --> LayerService.js
    //Função que salva os LAYERS
    $scope.salva = function() {
      //implementando a lógica de salvamento	
      $scope.layer.$save()
          .then(function() {
              $scope.mensagem = {texto: 'Salvo com sucesso'};
              // limpa o formulário
              $scope.layer = new Layer();
          })
          .catch(function(erro) {
              $scope.mensagem = {texto: 'Não foi possível salvar'};
          });
    };	
    
    Layer.query(function(layers) {
        $scope.layers = layers;
    });	
});