'use strict';

app.directive('footer', ['$rootScope',
	function($rootScope) {
		return {
			restrict: 'A',
			template: '<div ng-include="\'app/views/components/footer.html\'"/>'
		}
	}
]);