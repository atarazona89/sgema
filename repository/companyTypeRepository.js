(function(){
	gema.factory('CompanyTypeRepository',function($resource){
		return {
			companytype: $resource('http\://localhost\:8080/GeMA/companytype/:idWharehouse/',{idWharehouse: '@idWharehouse'},
				{
					'update':{
						method:'PUT',
					}
				}),
			// wharehouseSector: $resource('http\://localhost\:8080/GeMA/wharehouse/bysector/:idSector/',{idSector: '@idSector'})

		}
	});
})()