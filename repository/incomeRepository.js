(function(){
	gema.factory('IncomeRepository',function($resource){
		return {
			income: $resource('http\://localhost\:8080/GeMA/income/:idIncome/',{idIncome: '@idIncome'},
				{
					'update':{
						method:'PUT',
					}
				}),
			// bycompany: $resource('http\://localhost\:8080/GeMA/income/bycompany/:idCompany/',{idCompany: '@idCompany'})

		}
	});
})()