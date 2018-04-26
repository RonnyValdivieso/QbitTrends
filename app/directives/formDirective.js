'use strict';

app.directive('form', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/form.html\'"/>'
		}
	}
]);