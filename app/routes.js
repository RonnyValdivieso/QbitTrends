'use strict';

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {

		$routeProvider
		.when('/', {
			templateUrl: 'app/views/pages/administrador/index.html',
			controller: 'appController'
		})
		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'loginController'
		})
		.when('/home', {
			templateUrl: 'app/views/pages/home.html',
			controller: 'homeController'
		})
		.when('/404', {
			templateUrl: 'app/views/pages/page_404.html'
		})
		.otherwise({ redirectTo: '/404' });
	}
]);
