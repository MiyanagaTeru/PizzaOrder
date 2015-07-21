//This file stores form content directives.
(function() {
	var app = angular.module('form-contents', []);
	app.directive('locations', function(){
		return {
			restrict: "E",
			templateUrl: "locations.html"
		};
	});

	app.directive('franchises', function(){
		return {
			restrict: "E",
			templateUrl: "franchises.html"
		};
	});

	app.directive('specialities', function(){
		return {
			restrict: "E",
			templateUrl: "specialities.html"
		};
	});
	app.directive('toppings', function(){
		return {
			restrict: "E",
			templateUrl: "toppings.html"
		};
	});
	app.directive('review', function(){
		return {
			restrict: "E",
			templateUrl: "review.html"
		};
	});        
})();