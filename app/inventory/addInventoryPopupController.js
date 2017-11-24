(function(){
	gema.controller('AddInventoryPopupController',function($stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,
		StoresRepository,ProductRepository,WharehouseRepository
		){

		var global = this;

		ProductRepository.product.query().
		$promise.then(
			function(data){
				global.ltProducts = data;
		});

		WharehouseRepository.product.query().
		$promise.then(
			function(data){
				global.ltWharehouses = data;
		});

		this.addToInventory = function(storesRequest){
			StoresRepository.inventory.save(storesRequest)
			.$promise.then(
				function(newStores){
					$state.transitionTo('home.stores',{},{
					inherit:true,
					reload:true,
				});
			});
		};


	});
})()