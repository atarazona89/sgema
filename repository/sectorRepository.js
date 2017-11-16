(function(){
	gema.factory('SectorRepository',function($resource){
		return {
			sector: $resource('http\://localhost\:8080/GeMA/sector/:idSector/',{idSector: '@idSector'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()