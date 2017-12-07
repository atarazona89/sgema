(function(){
	gema.factory('IncomeStorageRepository',function($resource){
		return {
			incomestorage: $resource('http\://localhost\:8080/GeMA/incomestorage/:idIncomeStorage/',{idIncomeStorage: '@idIncomeStorage'},
				{
					'update':{
						method:'PUT',
					}
				}),
			// bycompany: $resource('http\://localhost\:8080/GeMA/income/bycompany/:idCompany/',{idCompany: '@idCompany'})

		}
	});
})()