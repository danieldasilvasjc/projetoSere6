// C:\projetoSere5\public\js\main.js

//CLIENT-SIDE

//Cria-se um módulo através do objeto 'angular'. 
//Através desse objeto que acessamos vários recursos do framework AngularJS
//o primeiro paramêtro desse módulo é o 'nome do módulo' e o segundo é um array com todas suas dependências
//o nome do 'MODULE = projetosere' possui o mesmo valor da DIRETIVA 'NG-APP = projetosere' que se encontra em nosso INDEX.HTML -> public/index.html
//ativa-se o sistema de rotas através de 'ngRoute'

//e depois utilizamos a função 'config()' que recebe uma função que tem como parâmetro um artefato INJETADO pelo AngularJS, o objeto $routeProvider
//ativa-se o objeto responsável pela criação das ROTAS, o $routeProvider
//ativa-se um serviço para consumir REST Endpoints, o ngResource
angular.module('projetosere',['ngRoute', 'ngResource']).config(function($routeProvider) {

    $routeProvider.when('/layers', {
      templateUrl: 'partials/layers.html',
      controller: 'LayersController'
    });

    //Cria-se mais uma rota
    //Criando uma rota para lidar com novos Layers
    //Criando a Rota responsável pela a exibição da parcial -> partials/layer.html
    $routeProvider.when('/layer/:layerId', {
    	templateUrl: 'partials/layer.html', 
    	controller: 'LayerController'
    });

    //lidando com novos Layers
    //criando mais uma nova rota, que não recebe parâmetros
    $routeProvider.when('/layer', {
      templateUrl: 'partials/layer.html',
      controller: 'LayerController'
    });

    //Criando uma Rota padrão
    $routeProvider.otherwise({redirectTo: '/layers'});
});