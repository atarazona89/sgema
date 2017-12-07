(function(){
	gema.controller('AddMaterialPopupController', function(
		$stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,

		MaterialRepository
		){

		var global = this;

		global.materialRequest = {};

		this.save = function(storageRequest){
			if (global.materialRequest != {}) {
				MaterialRepository.material.save(storageRequest)
				.$promise.then(function(data){
					$mdDialog.hide(data);
				});
			} else {
				global.cancel();
			}
		};

		this.close = function(){
			$mdDialog.cancel();
		};


	});

})()