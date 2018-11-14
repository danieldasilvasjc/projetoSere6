// C:\projetoSere6\public\js\services\LayerService.js

angular.module('projetosere').factory('Layer', function($resource) {
	
	return $resource('/layers/:id');
});