'use strict';

angular.module('ProUrban')
.controller('asientoController', ['$scope', '$rootScope', '$location', 'localStorageService', 'AsientoService', 'CuentasService',
	function($scope, $rootScope, $location, localStorageService, AsientoService, CuentasService) {

		$scope.proceso = 1;	

		$scope.getAsiento = getAsiento;
	

		function getAsiento() {
			AsientoService.getAsientoCredito()
			.then(function(response) {
				var arr_asiento = [];
				response = JSON.parse(response.respuesta);
				if (response.codigo === 1) {
					$scope.data = response.datos;
					var t = $scope.data.length;
				
					for (var i = 0; i < t; i++){
					    var asiento = {}; 
					    
						asiento.fecha = $scope.data[i].fecha;
						asiento.descripcion = $scope.data[i].descripcion;
						asiento.descripcion_creditocuenta = $scope.data[i].descripcion_creditocuenta;
						asiento.factura_id = $scope.data[i].factura_id;
						asiento.credito = $scope.data[i].credito;
						
				        arr_asiento.push(asiento);
					}
					
				    AsientoService.getAsientoDebito()
					.then(function(response) {
						response = JSON.parse(response.respuesta);
						if (response.codigo === 1) {
							$scope.data = response.datos;	
							for (var i=0; i < t; i++) {
							    arr_asiento[i].descripcion_debitocuenta = $scope.data[i].descripcion_debitocuenta;
								arr_asiento[i].debito = $scope.data[i].debito;
							}
							$scope.data = arr_asiento;

						} else {
							alert(response.mensaje);
						}
					}, function(err) {
						// MANEJO DE ERRORES
					});
			    
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}


		$scope.insertarAsiento = function() {
			var parametros = {
				descripcion: $scope.descripcion,
				fecha: $scope.fecha,
				numero_referencia: 'NULL',
				debito: $scope.valor,
				credito: $scope.valor,
				diferencia: 0.00,
				factura_id: 'NULL',
				cuentaxpagar_id: 'NULL',
				debitocuenta: $scope.cuentaPasivo.id,
				creditocuenta: $scope.cuentaActivo.id
			};

			console.log(parametros);

			if ($scope.proceso === 1) {
				AsientoService.insertarAsiento(parametros)
				.then(function(response) {
					response = JSON.parse(response.respuesta);
					if (response.codigo === 1) {
						console.log(parametros);
					//	$scope.proceso = 2;
						$location.path('asientoContable');
					}

					alert(response.mensaje);
				}, function(err){
					// MANEJO DE ERRORES
				});
			}
		}

		$scope.getAsiento();
		CuentasService.getCuentasActivo()
		.then(function(response) {
			$scope.cuentasActivo = JSON.parse(response.respuesta).datos;
			$scope.cuentaActivo = {
				id: "-1",
				name: "Seleccione una opci¨®n"
			};
		});


		$scope.getAsiento();
		CuentasService.getCuentasPasivo()
		.then(function(response) {
			$scope.cuentasPasivo = JSON.parse(response.respuesta).datos;
			$scope.cuentaPasivo = {
				id: "-1",
				name: "Seleccione una opci¨®n"
			};
		});

	}
]);
