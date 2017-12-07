(function(){
	gema.controller('AddWrapingPopupController', function(
		$stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,

		WrapingRepository
		){

		var global = this;

		global.wrapingRequest = {};


		this.saveWraping = function(wrapingRequest){
			if (global.wrapingRequest != {}) {

				WrapingRepository.wraping.save(wrapingRequest)
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