(function(){
	gema.controller('AddCompanyPopupController',function($stateParams,$state,
		$http,$scope,$mdDialog,$sce,$window,$mdColorPalette,

		CompanyRepository, CompanyTypeRepository
		){

		var global = this;

		CompanyTypeRepository.companytype.query().$promise.then(function(data){
			global.ltCompanyTypes = data;

			console.log("ltCompanyTypes: " + JSON.stringify(data));
		});

		this.saveCompany = function(companyRequest){
			console.log("companyRequest: "+ JSON.stringify(companyRequest));

			CompanyRepository.company.save(companyRequest).$promise.then(function(data){
				console.log("newcompany: " + JSON.stringify(data));


				$state.transitionTo('home.company',{},{
					inherit:true,
					reload:true,
				});
			});
		};

		this.close = function(){
			$state.transitionTo('home.company',{},{
				inherit:true,
				reload:true,
			});
		};

	});
})()