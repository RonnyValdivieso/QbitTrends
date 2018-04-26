'use strict';

angular.module('ProUrban')
.controller('cxpInactivosController', ['$scope', '$rootScope', '$location', 'localStorageService', 'CuentaxpagarService', 'ProveedorService',
	function($scope, $rootScope, $location, localStorageService, CuentaxpagarService, ProveedorService) {

		$scope.getCuentasxpagarInactivas = getCuentasxpagarInactivas;
		$scope.activarCuenta = activarCuenta;

		function getCuentasxpagarInactivas() {
			CuentaxpagarService.getCuentasxpagarInactivas()
			.then(function(response) {
				// MANEJO DE RESPUESTA
				
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.data = response.datos;
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		//modificar Proveedor
		function activarCuenta(id) {
			CuentaxpagarService.activarCuenta(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getCuentasxpagarInactivas();
				}

				alert(response.mensaje);
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		$scope.getCuentasxpagarInactivas();
	}
]);
