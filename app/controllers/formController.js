'use strict';

app.controller('formController', ['$scope', 'localStorageService', 'testService',
	function($scope, localStorageService, testService) {
		$scope.callEvent = callEvent;

		function callEvent() {
			testService.ListaEventosXcategoria($scope.categoria).then(function(response) {
				$scope.response = response;
			});
		}
	}
]);