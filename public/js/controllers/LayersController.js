// C:\projetoSere5\public\js\controllers\LayersController.js

//Solicitamos ao AngularJS o objeto $SCOPE, adicionando-o como parâmetro da função que define nosso CONTROLLER
//O $scope funciona da seguinte maneira: tudo que for adicionado dinamicamente nele estará disponívle na VIEW
//$scope -> INJEÇÃO DE DEPENDÊNCIA

// Nosso Controller foi REFATORADO devido ao ETAPA 5
// Removemos o atribusto $scope.total
// Removemos a função $scope.incrementa()
// Alterando um artefato, substituindo o $HTTP por $RESOURCE no nosso módulo principal, para trabalharmos em alto nível com os REST EndPoints
// realizando a troca da INJEÇÃO DE DEPENDÊNCIA de $resource pelo o nome do nosso serviço, 'Layer' - Necessidade do ETAPA 5
angular.module('projetosere').controller('LayersController', function(Layer, $scope) { 
    $scope.layers = [];
    //inserindo um scope para o filtro
    $scope.filtro = '';
    //inserindo um scope para a mensagem que vai aparecer para o usuário. Exibindo avisos para o usuário
    //Referente ao ETAPA 5
    $scope.mensagem = {texto: ''};
    
    //Função responsável pela busca dos Layers
    function buscaLayers() {
        Layer.query(function(layers) {
          $scope.layers = layers;
          $scope.mensagem = {};
      },
        function(erro) {
          console.log(erro);
             $scope.mensagem = { texto: 'Não foi possível obter a lista de layers'};
          }
      );
    }//fim da função buscaLayers
    buscaLayers();

    //Funão responsável pela remoção dos Layers
    //Criada no ETAPA 5
    //Observação: esta função já foi chamada na página parcial -> public/partials/layers.html, porém ela ainda não tinha sido criada aqui.
    $scope.remove = function(layer) {
        Layer.delete({id: layer._id}, 
        buscaLayers, 
        function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível remover o contato'
          };
          console.log(erro);
        }
      );
    }; 
});