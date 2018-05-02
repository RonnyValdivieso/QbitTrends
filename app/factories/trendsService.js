app.factory("TrendsService", ['$soap', '$rootScope', 'localStorageService', 'AppConfig',
	function($soap, $rootScope, localStorageService, AppConfig) {
		var service = {};

		service.autoComplete = autoComplete;
		service.interestByRegion = interestByRegion;
		service.interestOverTime = interestOverTime;
		service.relatedTopics = relatedTopics;
		service.relatedQueries = relatedQueries;
		service.getCountries = getCountries;
		service.getCategories = getCategories;
		service.getProperties = getProperties;
		// service.setCredentials = setCredentials;
		// service.getCredentials = getCredentials;
		// service.isLoggedIn = isLoggedIn;

		return service;

		function autoComplete(keyword) {
			return $.getJSON(AppConfig.apiUrl + '/autoComplete/' + keyword);
		}

		function interestOverTime(options) {
			var params = {
				keyword: options.keyword,
				category: options.category,
				startTime: options.startTime, //"2016-05-25",
				geo: options.geo
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/interestOverTime', params);
		}

		function interestByRegion(options) {
			var params = {
				keyword: options.keyword,
				category: options.category,
				startTime: options.startTime, //"2016-05-25",
				geo: options.geo
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/interestByRegion', params);
		}

		function relatedTopics(options) {
			var params = {
				keyword: options.keyword,
				category: options.category,
				startTime: options.startTime, //"2016-05-25",
				geo: options.geo
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/relatedTopics', params);
		}

		function relatedQueries(options) {
			var params = {
				keyword: options.keyword,
				category: options.category,
				startTime: options.startTime, //"2016-05-25",
				geo: options.geo
			};
			//	Realiza la llamada al servicio web enviando los parámetros
			//	en formato JSON
			return $.post(AppConfig.apiUrl + '/relatedQueries', params);
		}

		function getCountries() {
			return $.getJSON(AppConfig.apiUrl + '/getCountries');
		}

		function getCategories() {
			return $.getJSON(AppConfig.apiUrl + '/getCategories');
		}

		function getProperties() {
			return $.getJSON(AppConfig.apiUrl + '/getProperties');
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