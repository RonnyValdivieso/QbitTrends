'use strict';

angular.module('ProUrban')
.controller('prvInactivosController', ['$scope', '$rootScope', '$location', 'localStorageService', 'ProveedorService',
	function($scope, $rootScope, $location, localStorageService, ProveedorService) {

		$scope.getProveedoresInactivos = getProveedoresInactivos;
		$scope.activarProveedor = activarProveedor;

		function getProveedoresInactivos() {
			ProveedorService.getProveedoresInactivos()
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
		function activarProveedor(id) {
			ProveedorService.activarProveedor(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getProveedoresInactivos();
				}

				alert(response.mensaje);
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		$scope.getProveedoresInactivos();
	}
]);