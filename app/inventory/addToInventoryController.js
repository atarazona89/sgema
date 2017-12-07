(function(){
	gema.controller('AddToInventoryController',function(
		$stateParams,$state,$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,

		IncomeRepository,IncomeStorageRepository,
		WharehouseRepository,ProductRepository,
		CompanyRepository,CompanyTypeRepository,
		MaterialRepository,StorageRepository,IncomeStorageRepository,
		WrapingRepository,MeasurementRepository
		){

		var global = this;
		var showCheckBox = false;

		global.inventoryRequest = {};
		global.inventoryRequest.storage = false;
		global.inventoryRequest.ltStorage = [];

		global.ltCompanies = [];
		global.ltStorages = [];
		global.ltMaterials = [];
		global.ltWharehouses = [];
		global.ltWrapings = [];

		//======================= Primeras listas ====================//
		WharehouseRepository.wharehouse.query()
		.$promise.then(function(data){
			global.ltWharehouses = data;
		});

		ProductRepository.product.query()
		.$promise.then(function(data){
			data.forEach(function(product){
				product.measurement = MeasurementRepository.byproduct.get({idProduct:product.id});
			});
			global.ltProducts = data;
		});

		CompanyRepository.company.query()
		.$promise.then(function(data){
			data.forEach(function(company){
				company.companyType = CompanyTypeRepository.bycompany.get({idCompany:company.id});
			});

			global.ltCompanies = data;
		});

		StorageRepository.storage.query()
		.$promise.then(function(data){
			global.ltStorages = data;
		});

		MaterialRepository.material.query()
		.$promise.then(function(data){
			global.ltMaterials = data;
		});

		WrapingRepository.wraping.query()
		.$promise.then(function(data){
			global.ltWrapings = data;
		});
		//============================================================//

		//======================= Popups =============================//

		this.showOtherProduct = function(){
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
		 			global.incomeRequest.product = result;
		 			// Hacer la asigancion de variable a request
		 			// console.log("result");
		 			// console.log(result);
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
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
		 			global.incomeRequest.wharehouse = result;
		 			// Hacer la asigancion de variable a request
		 			// console.log("result");
		 			// console.log(result);
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
		 		}
		 	);
		};

		this.showOtherCompany = function(index){
			var templates = [
				'app/company/addCompanyPopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		    		result.companyType = CompanyTypeRepository.bycompany.get({idCompany:result.id});
		    		if (index == 1) global.inventoryRequest.producer = result;
		    		if (index == 2) global.inventoryRequest.distributor = result;
		 			global.ltCompanies.push(result);
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
		 		}
		 	);
		};

		this.showOtherWraping = function(index){
			var templates = [
				'app/wraping/addWrapingPopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		 			global.ltWrapings.push(result);
		 			global.inventoryRequest.ltStorage[index].wraping = result;
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
		 		}
		 	);
		};

		this.showOtherMaterial = function(index){
			var templates = [
				'app/material/addMaterialPopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
		      parent: angular.element(document.body),
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		 			global.ltMaterials.push(result);
		 			global.inventoryRequest.ltStorage[index].material = result;
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
		 		}
		 	);
		};

		this.checkBox = function(){
			// console.log("valor: " + !global.showCheckBox);
			global.showCheckBox = !global.showCheckBox;

			if (global.showCheckBox) {
				
				global.inventoryRequest.ltStorage = [];
				var newStorage = {};

				global.inventoryRequest.ltStorage.push(newStorage);
			}
			else{
				global.inventoryRequest.ltStorage = undefined;
			}
		};

		//============================================================//

		//======================= Metodos de formulario ==============//
		this.saveInventory = function(incomeRequest){
			var correcto = true;

			IncomeRepository.income.save(incomeRequest)
			.$promise.then(function(data){
				if (data != null) {
					correcto &= true;

					incomeRequest.ltStorage.forEach(function(storage){
						storage.income = data;
						IncomeStorageRepository.incomestorage.save(storage)
						.$promise.then(function(dataStorage){
							if (dataStorage != null && dataStorage.id > 0) {
								correcto &= true;
							}
							else{
								correcto &= false;
							}
						});
					});

					if (correcto) {

						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('#popupContainer')))
					        .clickOutsideToClose(true)
					        .title('Exito')
					        .textContent('Su inventario fue actualizado')
					        .ariaLabel('Alert Dialog Success')
					        .ok('Ok')
					        // .targetEvent(ev)
					    ).then(
					    	function(){
					    		global.goToWharehouses(incomeRequest.wharehouse.id);
					    	}
					    );
					} 
					else{
						$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('#popupContainer')))
					        // .clickOutsideToClose(true)
					        .title('Falla')
					        .textContent('Su inventario NO fue actualizado')
					        .ariaLabel('Alert Dialog Failure')
					        .ok('Ok')
					        // .targetEvent(ev)
					    )
					}
				}
				else {
					$mdDialog.show(
				      $mdDialog.alert()
				        .parent(angular.element(document.querySelector('#popupContainer')))
				        // .clickOutsideToClose(true)
				        .title('Falla')
				        .textContent('Su inventario NO fue actualizado')
				        .ariaLabel('Alert Dialog Failure')
				        .ok('Ok')
				        // .targetEvent(ev)
				    )
				}
			});
		};

		this.goToWharehouses = function(wharehouseid){
			if (wharehouseid != null && wharehouseid != 0) {
				$state.go('home.stores',{idWharehouse:wharehouseid});
			}
			else{
				$state.go('home.wharehouse');
			}
		};

		this.addStorage = function(){
			var newStorage = {};
			global.inventoryRequest.ltStorage.push(newStorage);
		};
		//============================================================//




	});
})()