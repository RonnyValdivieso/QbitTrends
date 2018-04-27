'use strict';

app.directive('loadstate', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/load_state.html\'"/>'
		}
	}
]);