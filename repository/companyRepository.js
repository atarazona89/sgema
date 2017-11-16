(function(){
	gema.factory('CompanyRepository',function($resource){
		return {
			company: $resource('http\://localhost\:8080/GeMA/company/:idCompany/',{idCompany: '@idCompany'},
				{
					'update':{
						method:'PUT',
					}
				}),
			companyUser: $resource('http\://localhost\:8080/GeMA/company/byuser/:idUser/',{idUser: '@idUser'})

		}
	});
})()