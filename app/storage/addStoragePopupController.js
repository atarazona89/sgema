(function(){
	gema.controller('AddStoragePopupController', function(
		$stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,

		StorageRepository
		){

		var global = this;

		global.storageRequest = {};


		this.saveStorage = function(storageRequest){
			if (global.storageRequest != {}) {

				StorageRepository.storage.save(storageRequest)
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