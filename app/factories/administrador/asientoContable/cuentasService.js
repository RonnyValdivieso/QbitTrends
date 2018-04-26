angular.module('ProUrban')
.factory("CuentasService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {

		var service = {};

		service.getCuentas = getCuentas;
		service.getCuentasActivo = getCuentasActivo;
		service.getCuentasPasivo = getCuentasPasivo;


		return service;

		function getCuentas() {
			return $soap.post(AppConfig.apiUrl, "ListaCuentas");
		}

		function getCuentasActivo() {
			return $soap.post(AppConfig.apiUrl, "ListaCuentasActivo");
		}

		function getCuentasPasivo() {
			return $soap.post(AppConfig.apiUrl, "ListaCuentasPasivo");
		}
    
	}
]);
