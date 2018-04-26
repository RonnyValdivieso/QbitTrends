'use strict';

angular.module('ProUrban')
.controller('cuentaxpagarController', ['$scope', '$rootScope', '$location', 'localStorageService', 'CuentaxpagarService', 'ProveedorService', 'FacturaService',
	function($scope, $rootScope, $location, localStorageService, CuentaxpagarService, ProveedorService, FacturaService) {

		$scope.proceso = localStorageService.get("proceso");	// 1: insertar

		$scope.getCuentasxpagar = getCuentasxpagar;
		$scope.insertarCuentaxpagar = insertarCuentaxpagar;
		$scope.modificarCuentaxpagar = modificarCuentaxpagar;
		$scope.eliminarCuentaxpagar = eliminarCuentaxpagar;
		$scope.buscarCuentaxpagar = buscarCuentaxpagar;

		function getCuentasxpagar() {
			CuentaxpagarService.getCuentasxpagar()
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

		//	Insertar Proveedor
		function insertarCuentaxpagar() {
			$scope.proceso = localStorageService.get("proceso");
			var parametros = {
				descripcion: $scope.descripcion,
				fecha: $scope.fecha,
				total: $scope.total,
				numero_referencia: $scope.numero_referencia,
				proveedor_id: $scope.proveedor.id
			};

			if ($scope.proceso === 1) {
				CuentaxpagarService.insertarCuentaxpagar(parametros)
				.then(function(response) {
					// MANEJO DE RESPUESTA
					response = JSON.parse(response.respuesta);

					if (response.codigo === 1) {
						clearForm();
						$scope.getCuentasxpagar();
					}

					alert(response.mensaje);
					$location.path('gastos');
				}, function(err){
					// MANEJO DE ERRORES
				});
			} else if ($scope.proceso === 2) {
				//Object.assign({id: $scope.id}, parametros);
				//parametros.id = $scope.id;
				modificarCuentaxpagar($scope.id, parametros);
			}
		}

		//modificar Proveedor
		function modificarCuentaxpagar(id, parametros) {
			var parametros = {
				id: id,
				descripcion: parametros.descripcion,
				fecha: parametros.fecha,
				total: parametros.total,
				numero_referencia: parametros.numero_referencia,
				proveedor_id: parametros.proveedor_id
			};

			console.log(parametros);
			CuentaxpagarService.modificarCuentaxpagar(parametros)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					clearForm();
					$scope.getCuentasxpagar();
					$scope.proceso = 1;	// 1: insertar
					localStorageService.set("proceso", $scope.proceso);
				}

				alert(response.mensaje);
				$location.path("/gastos");
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		//eliminar Proveedor
		function eliminarCuentaxpagar(id) {
			CuentaxpagarService.eliminarCuentaxpagar(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getCuentasxpagar();
				}

				alert(response.mensaje);
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		//buscar el Proveedor para luego ser modificado
		function buscarCuentaxpagar(id) {
			CuentaxpagarService.buscarCuentaxpagar(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					$rootScope.id = data.id;
					$rootScope.descripcion = data.descripcion;
					$rootScope.fecha = dateToObject(data.fecha);
					$rootScope.total = data.total;
					$rootScope.numero_referencia = data.numero_referencia;
					$rootScope.proveedor = {
						id: data.proveedor_id,
						name: data.nombre_proveedor
					};
					$scope.proceso = 2;	// 2: editar
					localStorageService.set("proceso", $scope.proceso);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		// guardar asiento Pago a proveedores
		$scope.generarPago = function(item) {
			var date = new Date();
			var dateFinal = date.getFullYear() + "/" + (date.getMonth() +1) + "/" + date.getDate();
			var conceptoPago = "Pago a proveedores"
			console.log("conceptoPago:::",conceptoPago);
			FacturaService.guardarAsientoProveedores(dateFinal, item.total, conceptoPago, item.numero_referencia, item.id)
			.then(function(response) {
				// MANEJO DE RESPUESTA

				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					CuentaxpagarService.pagarCuenta(item.id)
					.then(function(response) {

						response = JSON.parse(response.respuesta);

						if (response.codigo === 1) {
							alert('se guardo el asiento correctamente');
							$scope.getCuentasxpagar();
						}

					}, function(err) {
						console.log("ERROR: " + err);
					});
				} else {
					alert(response.mensaje);
				}
			}, function(err) {
				// MANEJO DE ERRORES
			});
		}

		$scope.goTo = function(url) {
			clearForm();
			$location.path(url);
		}

		//	Limpia los inputs de tipo text del formulario
		function clearForm() {
			$rootScope.descripcion = "";
			$rootScope.fecha = "";
			$rootScope.total = "";
			$rootScope.numero_referencia = "";
			$rootScope.proveedor = {
				id: "",
				name: ""
			};
			$scope.proceso = 1;	// 1: insertar
			localStorageService.set("proceso", $scope.proceso);
			$('#cuentaxpagarForm input[type="text"]').val("");
		}

		function dateToObject(strDate) {
			var date = new Date(strDate);
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate() + 1;
			strDate = year + "-" + month + "-" + day;

			return new Date(strDate);
		}

		$scope.getCuentasxpagar();

		ProveedorService.getProveedores()
		.then(function(response) {
			$scope.proveedores = JSON.parse(response.respuesta).datos;
			$scope.proveedor = {
				id: "-1",
				name: "Seleccione una opción"
			};
		});

	}
]);
