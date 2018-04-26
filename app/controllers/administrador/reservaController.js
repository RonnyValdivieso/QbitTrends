'use strict';

angular.module('ProUrban')
.controller('reservaController', ['$scope', '$rootScope', '$location', 'localStorageService', 'ReservaService', 'FacturaService',
	function($scope, $rootScope, $location, localStorageService, ReservaService, FacturaService) {

		$scope.proceso = 1;	// 1: insertar

		$scope.getReservas = getReservas;
		$scope.pagarReserva = pagarReserva;
		$scope.buscarPreReserva = buscarPreReserva;


		function getReservas() {
			ReservaService.getReservas()
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
				console.log(err);
			});
		}

		function buscarPreReserva(id) {
			ReservaService.buscarPreReserva(id)
			.then(function(response) {
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					// data = {
					// 	cuenta_id: 
					// }

					console.log(data);

					// FacturaService.init(data);
					// $location.path('factura');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		function pagarReserva(id) {
			ReservaService.pagarReserva(id)
			.then(function(response) {
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getReservas();
				}

				alert(response.mensaje);
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		$scope.getReservas();

	}
]);
