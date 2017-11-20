(function(){
	gema.controller('WharehouseDetailsController', function($stateParams,$state,$http,$scope,
		$mdColorPalette,

		WharehouseRepository, ){

		var global = this;
		var wharehouse = {};
		var ltProductos = {};

		WharehouseRepository.wharehouse.query({id:$stateParams.idwh}).$promise.then(function(data){
			global.wharehouse = data;



		});;


	});
});