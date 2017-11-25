(function(){
	gema.controller('WharehouseController', function(
		$stateParams,$state,$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,
		WharehouseRepository, SectorRepository, PermitRepository){

		var global = this;
		var showThis = 0;

		SectorRepository.sector.query().$promise.then(function(data){
			global.ltSector = data;
		});

		WharehouseRepository.wharehouse.query()
		.$promise.then(function(data){
			
			data.forEach(function(wharehouse){
				wharehouse.sector = SectorRepository.bywharehouse.get({idWharehouse:wharehouse.id});
			});

			global.ltWharehouse = data;

		});

		this.addWharehouse = function(){
			var templates = [
				'app/wharehouse/addWharehousePopup.html'
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
		 			global.ltWharehouse.push(result);
		 		}, 
		 		function(){
		 			console.log("Cancelado")
		 		});
		};

		// Manejo de la lista desplegable

		this.show = function(sectorId){
			// console.log("sectorId: " + sectorId);
			if (global.showThis == sectorId) {
				global.showThis = 0;
			} else{
				global.showThis = sectorId;
			}
		};

		this.isShowing = function(sectorId){
			return (global.showThis == sectorId);
		};

		this.toStores = function(wharehouseid){
			// console.log("Id wharehouse: " + wharehouseid);
            $state.go('home.stores',{idWharehouse:wharehouseid});
		};

	});
})()