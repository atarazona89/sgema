(function(){
	gema.controller('CompanyController', function($stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,
		CompanyRepository
		){

		var global = this;

		CompanyRepository.company.query().$promise.then(function(data){
			// console.log("Companies: "+JSON.stringify(data));

			global.ltCompanies = data;

		});

		this.addCompany = function(){
			var templates = [
				'app/company/addCompanyPopup.html'
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
		 			global.ltCompanies.push(result);
		 		}, 
		 		function(){
		 			console.log("Cancelado");
		 		}
		 	);
		};

	});
})()