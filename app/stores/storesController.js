(function(){
	gema.controller('StoresController',function($stateParams,$state,
		$http,$scope,$filter,$mdDialog,$sce,$window,$mdColorPalette,

		NgTableParams,
		WharehouseRepository,StoresRepository, MeasurementRepository, ProductRepository){

		//========================================DECLARACION DE VARIABLES=================================//

		var global = this;
		global.ltProducts = [];
		global.ltStores = [];
		global.transferRequest = {

		};

		global.tableParams = new NgTableParams({}, { dataset: global.ltStores});

		// console.log("Parametro: "+$stateParams.idWharehouse);

		//========================================INICIALIZACION DE VARIABLES==============================//
		WharehouseRepository.wharehouse.get({idWharehouse:$stateParams.idWharehouse})
		.$promise.then(
			function(data){
				// console.log(data);
				global.wharehouse = data;
			});

		WharehouseRepository.wharehouse.query()
		.$promise.then(
			function(data){
				global.ltWharehouses = data;
		});

		StoresRepository.storeswharehouse.query({idWharehouse:$stateParams.idWharehouse})
		.$promise.then(
			function(data){
				// console.log("Stores:");
				// console.log(data);

				data.forEach(function(store){
					MeasurementRepository.byproduct.get({idProduct:store.product.id})
												.$promise.then(function(measurementInc){
													store.product.measurement = measurementInc;
													store.productName = store.product.name;
													store.acronym = store.product.measurement.acronym;

													// console.log(store);
												});
				})

				// console.log(data);
				global.ltStores = data;
			});

		ProductRepository.product.query().$promise.then(function(data){
			// console.log("Products: " + data);

			data.forEach(function(product){
				product.mesurement = MeasurementRepository.byproduct.get({idProduct:product.id});
			});

			global.ltProducts = data;
		});

		//========================================FUNCIONES================================================//

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

		this.transferTo = function(index){
			// console.log(index);
			console.log(global.ltStores[index]);
		};

		this.showPopup = function(index){
			var templates = [
				'app/stores/transferPopup.html'
			];

			global.transferRequest = {
				wharehouseFrom: global.wharehouse,
				product: global.ltStores[index].product,
				maxQuantiy: global.ltStores[index].amount
			};


			$mdDialog.show({
		      templateUrl: templates[0],
		      locals:{dataPadre: global.transferRequest},
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      multiple: true,
		      clickOutsideToClose:true
		    }).then(function(data){
		    	// console.log("Success");
		    	StoresRepository.storeswharehouse.query({idWharehouse:$stateParams.idWharehouse})
		    	.$promise.then(
		    		function(data){
		    			// console.log("Stores:");
		    			// console.log(data);

		    			data.forEach(function(store){
		    				MeasurementRepository.byproduct.get({idProduct:store.product.id})
		    											.$promise.then(function(measurementInc){
		    												store.product.measurement = measurementInc;
		    												store.productName = store.product.name;
		    												store.acronym = store.product.measurement.acronym;

		    												// console.log(store);
		    											});
		    			})

		    			// console.log(data);
		    			global.ltStores = data;
		    		});
		    },function(){
		    	// console.log("Failure");
		    });
		};

	});
})()