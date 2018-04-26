angular.module('ProUrban')
.factory("ProveedorService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.getProveedores = getProveedores;
		service.insertarProveedor = insertarProveedor;
		service.modificarProveedor = modificarProveedor;
		service.eliminarProveedor = eliminarProveedor;
		service.buscarProveedor = buscarProveedor;
		service.getProveedoresInactivos = getProveedoresInactivos;
		service.activarProveedor = activarProveedor;

		return service;

		function getProveedores() {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ListaProveedores");
		}

		function getProveedoresInactivos() {

			return $soap.post(AppConfig.apiUrl, "ListaProveedoresInactivos");
		}

		function insertarProveedor(descripcion, ruc) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "InsertarProveedor",
				{ descripcion: descripcion, ruc: ruc });
		}

		function buscarProveedor(id) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "BuscarProveedor",
				{ id: id });
		}

		function modificarProveedor(id, descripcion, ruc) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ModificarProveedor",
					{ id: id, descripcion: descripcion, ruc: ruc });
		}

		function eliminarProveedor(id) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "EliminarProveedor",
				{ id: id });
		}

		function activarProveedor(id) {

			return $soap.post(AppConfig.apiUrl, "ActivarProveedor",
				{ id: id });
		}
	}
]);
