(function(){
	gema.controller('AddToInventoryController',function(
		$stateParams,$state,$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,
		WharehouseRepository,ProductRepository
		){

		var global = this;

		WharehouseRepository.wharehouse.query()
		.$promise.then(function(data){
			global.ltWharehouses = data;
		});

		ProductRepository.product.query()
		.$promise.then(function(data){
			global.ltProducts = data;
		});

		this.showOtherProduct = function(ev){
			var templates = [
				'app/product/addProductPopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
	     	  //controller: 'AddWharehouseController',
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		 			global.ltProducts.push(result);
		 			global.inventoryRequest.product = result;
		 			// Hacer la asigancion de variable a request
		 			// console.log("result");
		 			// console.log(result);
		 		}, 
		 		function(){
		 			console.log("Cancelado");
		 		}
		 	);
		};

		this.showOtherWharehouse = function(){
			var templates = [
				'app/wharehouse/addWharehousePopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		 			global.ltWharehouses.push(result);
		 			global.inventoryRequest.wharehouse = result;
		 			// Hacer la asigancion de variable a request
		 			// console.log("result");
		 			// console.log(result);
		 		}, 
		 		function(){
		 			console.log("Cancelado");
		 		}
		 	);
		};

	});
})()