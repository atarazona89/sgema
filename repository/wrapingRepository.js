(function(){
	gema.factory('WrapingRepository',function($resource){
		return {
			wraping: $resource('http\://localhost\:8080/GeMA/wraping/:idWraping/',{idWraping: '@idWraping'},
				{
					'update':{
						method:'PUT',
					}
				}),
			byincome: $resource('http\://localhost\:8080/GeMA/income/byincome/:idIncome/',{idIncome: '@idIncome'})

		}
	});
})()