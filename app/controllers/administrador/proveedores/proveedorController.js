'use strict';

angular.module('ProUrban')
.controller('proveedorController', ['$scope', '$rootScope', '$location', 'localStorageService', 'ProveedorService',
	function($scope, $rootScope, $location, localStorageService, ProveedorService) {

		$scope.proceso = localStorageService.get("proceso");	// 1: insertar

		$scope.getProveedores = getProveedores;
		$scope.insertarProveedor = insertarProveedor;
		$scope.modificarProveedor = modificarProveedor;
		$scope.eliminarProveedor = eliminarProveedor;
		$scope.buscarProveedor = buscarProveedor;

		function getProveedores() {
			ProveedorService.getProveedores()
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
		function insertarProveedor() {
			$scope.proceso = localStorageService.get("proceso");
			if ($scope.proceso === 1) {
				ProveedorService.insertarProveedor($scope.descripcion, $scope.ruc)
				.then(function(response) {
					// MANEJO DE RESPUESTA
					response = JSON.parse(response.respuesta);

					if (response.codigo === 1) {
						clearForm();
						$scope.getProveedores();
					}

					alert(response.mensaje);
					$location.path("/proveedores");
				}, function(err){
					// MANEJO DE ERRORES
				});
			} else if ($scope.proceso === 2) {
				modificarProveedor();
			}
		}

		//modificar Proveedor
		function modificarProveedor() {
			ProveedorService.modificarProveedor($scope.id, $scope.descripcion, $scope.ruc)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					clearForm();
					$scope.getProveedores();
					$scope.proceso = 1;	// 1: insertar
					localStorageService.set("proceso", $scope.proceso);
				}

				alert(response.mensaje);
				$location.path("/proveedores");
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		//eliminar Proveedor
		function eliminarProveedor(id) {
			ProveedorService.eliminarProveedor(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					$scope.getProveedores();
				}

				alert(response.mensaje);
			}, function(err){
				// MANEJO DE ERRORES
			});
		}

		//buscar el Proveedor para luego ser modificado
		function buscarProveedor(id) {
			ProveedorService.buscarProveedor(id)
			.then(function(response) {
				// MANEJO DE RESPUESTA
				response = JSON.parse(response.respuesta);

				if (response.codigo === 1) {
					var data = response.datos[0];
					$rootScope.id = data.id;
					$rootScope.descripcion = data.descripcion;
					$rootScope.ruc = data.ruc;
					$scope.proceso = 2;	// 2: editar
					localStorageService.set("proceso", $scope.proceso);
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
			$rootScope.ruc = "";
			$scope.proceso = 1;	// 1: insertar
			localStorageService.set("proceso", $scope.proceso);
			$('#proveedorForm input[type="text"]').val("");
		}

		$scope.getProveedores();

	}
]);
