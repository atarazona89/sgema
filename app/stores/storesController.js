(function(){
	gema.controller('StoresController',function($stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,
		WharehouseRepository,StoresRepository, ProductRepository){

		var global = this;

		// console.log("Parametro: "+$stateParams.idWharehouse);

		WharehouseRepository.wharehouse.get({idWharehouse:$stateParams.idWharehouse})
		.$promise.then(
			function(data){
				// console.log(data);
				global.wharehouse = data;
			});

		StoresRepository.storeswharehouse.query({idWharehouse:$stateParams.idWharehouse})
		.$promise.then(
			function(data){
				// console.log("Stores:");
				// console.log(data);
				global.ltStores = data;
			});

		ProductRepository.product.query().$promise.then(function(data){
			// console.log("Products: " + data);
			global.ltProducts = data;
		});

		this.addInventory = function(){
			var templates = [
				'app/inventory/addInventoryPopup.html'
			];

			$mdDialog.show({
		      
		      templateUrl: templates[0],
	     	  //controller: 'AddWharehouseController',
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    });
		};

	});
})()