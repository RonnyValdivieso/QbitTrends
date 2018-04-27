'use strict';

app.directive('vmap', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/vmap.html\'"/>'
		}
	}
]);