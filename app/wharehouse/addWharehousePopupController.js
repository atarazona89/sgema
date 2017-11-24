(function(){
	gema.controller('AddWharehouseController', function(
		$state,$stateParams,$translate,$http,$scope,$mdDialog,$sce,$window,		
		WharehouseRepository, SectorRepository, PermitRepository){

		var global = this;

		var otherSector = 0;
		var sectorRequest = [];
		var sectorElegido = null;

		SectorRepository.sector.query().$promise.then(function(data){
			global.ltSector = data;
			// console.log("lista sectores");
			// console.log(data);
		});

		PermitRepository.permit.query().$promise.then(function(data){
			global.ltPermit = data;
			// console.log("Permisos cargados");
			// console.log(data);

		});

		this.saveWharehouse = function(wharehouseRequest){
			
			// console.log("Request: " + JSON.stringify(wharehouseRequest));

			WharehouseRepository.wharehouse.save(wharehouseRequest).$promise.then(function(newWharehouse){
				$mdDialog.hide(newWharehouse);
			});
		};

		this.close = function(){
			$mdDialog.cancel();
		};

		/*---------------------------------- Operaciones de Sector ----------------------------------*/

		this.showOther = function(value){
			global.otherSector = value;
			// console.log("valor de showOther: " + value);
			if(value != 1){
				// global.sectorRequest.name = "";
				global.sectorRequest = [];
			}
		};

		this.saveSector = function(sectorRequest){
			console.log("Nombre del nuevo sector: " + sectorRequest.name);
			// var newSector = {};

			if (global.sectorRequest.name != null) {
				SectorRepository.sector.save(sectorRequest).$promise.then(function(data){
					console.log(data);

					// newSector.id = data.id;
					// newSector.name = data.name;

					global.ltSector.push(data);

					// console.log("Sector nuevo: " + newSector);
					// global.sectorElegido = data;
					// console.log("Sector elegido: \n\tNombre" + global.sectorElegido.name+"\n\tid: "+global.sectorElegido.id);

					global.wharehouseRequest.sector = data;

					global.showOther(0); // <---------- Se cierra la opcion
				});
			}
		};

	});
})()