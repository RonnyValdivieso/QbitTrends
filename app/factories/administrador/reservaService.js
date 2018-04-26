 angular.module('ProUrban')
.factory("ReservaService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.getReservas = getReservas;
		service.pagarReserva = pagarReserva;
		service.buscarPreReserva = buscarPreReserva;

		return service;


		function getReservas() {
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $soap.post(AppConfig.apiUrl, "ListaPreReservas");
		}

		function buscarPreReserva(id) {
			//
			return $soap.post(AppConfig.apiUrl, "BuscarPreReserva",
				{ id: id });
		}

		function pagarReserva(id) {
			//
			return $soap.post(AppConfig.apiUrl, "PagarReserva",
				{ id: id });
		}
	}
]);
