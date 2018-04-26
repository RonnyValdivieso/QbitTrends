'use strict';

angular.module('ProUrban')
.controller('cuentaxcobrarController', ['$scope', '$rootScope', '$location', 'localStorageService', 'cuentaXcobrarService', 'FacturaService',
	function($scope, $rootScope, $location, localStorageService, cuentaXcobrarService, FacturaService) {

		$scope.proceso = 1;	// 1: insertar

		$scope.getCuentaXcobrar = getCuentaXcobrar;
		$scope.buscarCuentaXcobrar = buscarCuentaXcobrar;


		function getCuentaXcobrar() {
			if ($scope.proceso === 1 ) {
				cuentaXcobrarService.getCuentaXcobrar("nulo")
				.then(function(response) {
					response = JSON.parse(response.respuesta);

					if (response.codigo === 1) {
						$scope.data = response.datos;
					} else {
						alert(response.mensaje);
					}
				}, function(err) {
					// MANEJO DE ERRORES
				});
				$scope.proceso = 2;
			} else {
				cuentaXcobrarService.getCuentaXcobrar($scope.nombrexBuscar)
				.then(function(response) {
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
		}

		function buscarCuentaXcobrar(id) {
			cuentaXcobrarService.buscarCuentaXcobrar(id)
			.then(function(response) {
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					var conceptopago = 1;
					FacturaService.init(data.id, conceptopago);
					$location.path('factura');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		$scope.getCuentaXcobrar();

	}
]);
