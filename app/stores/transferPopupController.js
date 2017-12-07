(function() {
	gema.controller('TransferPopupController', function($state,
		$http,$scope,$filter,$mdDialog,$sce,$window,$mdColorPalette,
		WharehouseRepository,StoresRepository, MeasurementRepository, ProductRepository){

		//=======================================VARIABLES=====================================================//

		var global = this;

		global.transferRequest = $scope.storesCtrl.transferRequest;
		$scope.max = global.transferRequest.maxQuantiy;

		console.log(global.transferRequest);
		//=====================================================================================================//
		//=====================================INICIALIZACION DE LISTAS========================================//

		WharehouseRepository.wharehouse.query()
		.$promise.then(function(wharehouses){
			global.ltWharehouses = wharehouses;
		});


		//=====================================================================================================//
		//======================================FUNCIONES======================================================//
		this.showOtherWharehouse = function(){
			var templates = [
				'app/wharehouse/addWharehousePopup.html'
			];

			$mdDialog.show({
		      templateUrl: templates[0],
		      scope: $scope,        // use parent scope in template
      		  preserveScope: true,  // do not forget this if use parent scope
      		  skipHide: true,
		      parent: angular.element(document.body),
		      multiple: true,
		      clickOutsideToClose:true
		    }).then(
		    	function(result){
		 			global.ltWharehouses.push(result);
		 			global.transferRequest.wharehouse = result;
		 			// Hacer la asigancion de variable a request
		 			// console.log("result");
		 			// console.log(result);
		 		}, 
		 		function(){
		 			// console.log("Cancelado");
		 		}
		 	);
		};

		this.save = function(request){
			StoresRepository.transfer.save(request)
			.$promise.then(function(result){
				if(result){
					// console.log(result);
					$mdDialog.show(
					      $mdDialog.alert()
					        .parent(angular.element(document.querySelector('#popupContainer')))
					        .clickOutsideToClose(true)
					        .title('¡Éxito!')
					        .textContent('Su producto fue transferido')
					        .ariaLabel('Éxito!')
					        .ok('OK')
					        // .targetEvent(ev)
					        .multiple(true)
					    );

					$mdDialog.hide(result);
				}
			});
		};

		this.cancel = function(){
			$mdDialog.cancel();
		};

	});

})()