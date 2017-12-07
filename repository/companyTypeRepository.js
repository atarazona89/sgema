(function(){
	gema.factory('CompanyTypeRepository',function($resource){
		return {
			companytype: $resource('http\://localhost\:8080/GeMA/companytype/:idWharehouse/',{idWharehouse: '@idWharehouse'},
				{
					'update':{
						method:'PUT',
					}
				}),
			bycompany: $resource('http\://localhost\:8080/GeMA/companytype/bycompany/:idCompany/',{idCompany: '@idCompany'})

		}
	});
})()