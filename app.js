(function() {
	var app = angular.module('orderPizza', ['form-contents']);
	//controller to handle the order data and react to user's actions
	app.controller('OrderController', ['$http','$filter','$scope', function($http, $filter, $scope){		
		//load shop info
		$scope.fulldata = [];
		$http.get("data.json").success(function(data){
			$scope.fulldata = data;
		});

		//init order to store user's choices
		$scope.order = {};

		//filters for each step: location, franchise, speciality. The result is used to create form content
		$scope.filterByLocation = function(location) {
			var found = $filter('filter')($scope.fulldata, { location: location }, true);
			if (found.length) {
				$scope.curFranchises = found[0].franchises;
			} else {
				$scope.curFranchises = 'Not found';
			}    
		}
		$scope.filterByFranchise = function(franchiseName) {
			var found = $filter('filter')($scope.curFranchises, { franchiseName: franchiseName }, true);
			if (found.length) {
				$scope.curSpecialities = found[0].pizzas;
			} else {
				$scope.curSpecialities  = 'Not found';
			}    
		} 	
		$scope.filterBySpeciality = function(pizzaName) {
			var found = $filter('filter')($scope.curSpecialities, { pizzaName: pizzaName }, true);
			if (found.length) {
				$scope.curPizza = found[0];
				$scope.order.toppings = angular.copy($scope.curPizza.mustToppings);        
			} else {
				$scope.curPizza  = 'Not found';
			}    
		};

		//function to handle check box value. Put all checked values into array order.toppings
		$scope.toggleSelection = function toggleSelection(topping) {
			var idx = $scope.order.toppings.indexOf(topping);
		    // is currently selected
		    if (idx > -1) {
		    	$scope.order.toppings.splice(idx, 1);
		    }

		    // is newly selected
		    else {
		    	$scope.order.toppings.push(topping);
		    }
		};

		//function to submit order data
		$scope.submit = function submit (order){
			console.log(order);
			alert("Thank you!\nThe order info is printed in console.");
		}
	}]);

	//progressBar(tab) controller
	app.controller('progressBarController', function(){
		this.tab = 1;
		this.isSet = function(checkTab){
			return this.tab === checkTab;
		};
		this.setTab = function(activeTab) {
			if ( activeTab <= this.tab + 1) //limit navagation to next 1 tab.
			{
				this.tab = activeTab;
			}
		};
		this.back = function(){
			if (this.tab > 1 )
				this.tab -= 1;
		};
		this.next = function(){
			if (this.tab < 5)
			{
				this.tab += 1;
			}
		};  	
	});

	//directive for progressBar
	app.directive('progressBar', function(){
		return {
			restrict: "E",
			templateUrl: "progressBar.html"
		};
	});


})();