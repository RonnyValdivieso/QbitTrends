'use strict';

angular.module('ProUrban')
.controller('facturaController', ['$scope', '$rootScope', '$location', 'localStorageService', 'FacturaService',
	function($scope, $rootScope, $location, localStorageService, FacturaService) {


		$scope.buscarCabeceraFactura = buscarCabeceraFactura;
		$scope.buscarDetalleFactura = buscarDetalleFactura;
		$scope.pagarFactura = pagarFactura;
		$scope.guardarCabeceraFactura = guardarCabeceraFactura;
		$scope.guardarDetalleFactura = guardarDetalleFactura;
		$scope.guardarAsiento = guardarAsiento;
		function buscarCabeceraFactura() {
			var id = localStorageService.get('idCabeceraFactura');

			FacturaService.buscarCabeceraFactura(id)
			.then(function(response) {
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					$scope.id = data.id;
					$scope.nombreF = data.nombre;
					$scope.cedula = data.cedula;
					$scope.direccion = data.direccion;
					$scope.numFactura = "Nº 001 - 0000010";

				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		function buscarDetalleFactura() {
			var id = localStorageService.get('idconceptopago');

			FacturaService.buscarDetalleFactura(id)
			.then(function(response) {
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					$scope.idDetalle = data.id;
					$scope.descripcionDetalle = data.descripcion;
					$scope.valorDetalle = data.valor;
					$scope.ivaDetalle = $scope.valorDetalle * 0.12;
					$scope.totalDetalle = parseInt($scope.valorDetalle) + parseInt($scope.ivaDetalle);

				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		$scope.buscarCabeceraFactura();
		$scope.buscarDetalleFactura();
		// pago de factura

		function pagarFactura() {
			var id = localStorageService.get('idCabeceraFactura');
			FacturaService.pagarFactura(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.guardarCabeceraFactura()
					console.log('se pago la factura correctamente');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		// guardar cabecera factura
		function guardarCabeceraFactura() {
			var date = new Date();
			var dateFinal = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + date.getDate();
			var formapago = 1;
			console.log(dateFinal +' - '+ $scope.numFactura +' - '+ $scope.valorDetalle +' - '+ $scope.totalDetalle + ' - '+formapago +' - '+ $scope.id );
			FacturaService.guardarCabeceraFactura(dateFinal, $scope.numFactura, $scope.valorDetalle, $scope.ivaDetalle, $scope.totalDetalle, formapago, $scope.id)
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					console.log(response);
					$scope.guardarDetalleFactura(data.id);
					console.log('aqui va el asiento');
					$scope.guardarAsiento(data.id);
					console.log('se guardo la cabecera de la factura correctamente');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		// guardar detalle factura
		function guardarDetalleFactura(idFactura) {
			var conceptoId = localStorageService.get('idconceptopago');
			FacturaService.guardarDetalleFactura($scope.valorDetalle, conceptoId ,idFactura)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					// $location.path('deudas');
					console.log('se guardo el detalle de la factura correctamente');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		// guardar detalle factura
		function guardarAsiento(idFactura) {
			var date = new Date();
			var dateFinal = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + date.getDate();
			var conceptoPago = "Alicuota"
			console.log("conceptoPago:::",conceptoPago);
			FacturaService.guardarAsiento(dateFinal, $scope.valorDetalle, conceptoPago ,idFactura)
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$location.path('deudas');
					console.log('se guardo el asiento correctamente');
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

	}
]);
