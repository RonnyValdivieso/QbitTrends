'use strict';

angular.module('ProUrban')
.controller('cuentasController', ['$scope', '$rootScope', '$location', 'localStorageService', 'CuentasService',
	function($scope, $rootScope, $location, localStorageService, CuentasService) {

		$scope.getCuentas = getCuentas;

		function getCuentas() {
			CuentasService.getCuentas()
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.data = response.datos;
          			console.log('asientos:::', response.datos);
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}


		$scope.getCuentas();

	}
]);
