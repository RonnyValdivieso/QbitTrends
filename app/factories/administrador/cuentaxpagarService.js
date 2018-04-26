angular.module('ProUrban')
.factory("CuentaxpagarService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.getCuentasxpagar = getCuentasxpagar;
		service.insertarCuentaxpagar = insertarCuentaxpagar;
		service.modificarCuentaxpagar = modificarCuentaxpagar;
		service.eliminarCuentaxpagar = eliminarCuentaxpagar;
		service.buscarCuentaxpagar = buscarCuentaxpagar;
		service.getCuentasxpagarInactivas = getCuentasxpagarInactivas;
		service.activarCuenta = activarCuenta;
		service.pagarCuenta = pagarCuenta;

		return service;


		function getCuentasxpagar() {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ListaCuentasxpagar");
		}

		function getCuentasxpagarInactivas() {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ListaCuentasxpagarInactivas");
		}

		function insertarCuentaxpagar(parametros) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "InsertarCuentaxpagar",
					parametros);
		}

		function buscarCuentaxpagar(id) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "BuscarCuentaxpagar",
					{ id: id });
		}

		function pagarCuenta(id) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "PagarCuenta",
					{ id: id });
		}

		function modificarCuentaxpagar(parametros) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ModificarCuentaxpagar",
					parametros);
		}

		function eliminarCuentaxpagar(id) {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "EliminarCuentaxpagar",
					{ id: id });
		}

		function activarCuenta(id) {

			return $soap.post(AppConfig.apiUrl, "ActivarCuentaxpagar",
					{ id: id });
		}
	}
]);
