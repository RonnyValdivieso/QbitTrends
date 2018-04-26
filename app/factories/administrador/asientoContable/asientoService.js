angular.module('ProUrban')
.factory("AsientoService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.getAsientoDebito = getAsientoDebito;
		service.getAsientoCredito = getAsientoCredito;
		service.insertarAsiento = insertarAsiento;


		return service;

		function getAsientoDebito() {
			return $soap.post(AppConfig.apiUrl, "ListaAsientoDebito");
		}

		function getAsientoCredito() {
			return $soap.post(AppConfig.apiUrl, "ListaAsientoCredito");
		}

		function insertarAsiento(parametros) {
			return $soap.post(AppConfig.apiUrl, "InsertarAsiento",
					parametros);
		}
	}
]);
