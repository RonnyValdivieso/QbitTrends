app.factory("TrendsService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {
		var service = {};

		service.interestByRegion = interestByRegion;
		service.interestOverTime = interestOverTime;
		service.relatedTopics = relatedTopics;
		service.relatedQueries = relatedQueries;
		// service.setCredentials = setCredentials;
		// service.getCredentials = getCredentials;
		// service.isLoggedIn = isLoggedIn;

		return service;

		function interestOverTime(searchTerm) {
			var params = {
				keyword: searchTerm,
				category: 0,
				startTime: "2016-05-25",
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/interestOverTime', params);
		}

		function interestByRegion(searchTerm) {
			var params = {
				keyword: searchTerm,
				category: 0,
				startTime: "2016-05-25",
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/interestByRegion', params);
		}

		function relatedTopics(searchTerm) {
			var params = {
				keyword: searchTerm,
				category: 0,
				startTime: "2016-05-25",
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/relatedTopics', params);
		}

		function relatedQueries(searchTerm) {
			var params = {
				keyword: searchTerm,
				category: 0,
				startTime: "past_7_days",
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/relatedQueries', params);
		}

		//	Setea los datos del usuario en localStorage para controlar la sesión,
		//	y en rootScope para poder usar la información en cualquier vista
		function setCredentials(data) {
			localStorageService.set('usuario', data);
			$rootScope.usuario = data.nombre_usuario;
			$rootScope.nombre = fullName(data.primer_nombre, data.primer_apellido);
		}

		//	Consulta la información guardada en localStorage
		function getCredentials(usuario, clave) {
			return localStorageService.get('usuario');
		}

		//	Verifica si hay información (de usuario) en localStorage
		function isLoggedIn() {
			if (localStorageService.length() > 0) {
				return true;
			} else { return false; }
	    }

	    function fullName(nombre, apellido) {
	    	return nombre + " " + apellido;
	    }

	    function isEmpty(obj) {
	    	return jQuery.isEmptyObject(obj);
	    }
}]);