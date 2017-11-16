(function(){
	gema.factory('WharehouseRepository',function($resource){
		return {
			wharehouse: $resource('http\://localhost\:8080/GeMA/wharehouse/:idWharehouse/',{idWharehouse: '@idWharehouse'},
				{
					'update':{
						method:'PUT',
					}
				}),
			wharehouseSector: $resource('http\://localhost\:8080/GeMA/wharehouse/bysector/:idSector/',{idSector: '@idSector'})

		}
	});
})()