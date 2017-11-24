(function(){
	gema.factory('StoresRepository',function($resource){
		return {
			stores: $resource('http\://localhost\:8080/GeMA/stores/:idPermit/',{idPermit: '@idPermit'},
				{
					'update':{
						method:'PUT',
					}
				}),
			storeswharehouse: $resource('http\://localhost\:8080/GeMA/stores/bywharehouse/:idWharehouse/',{idWharehouse: '@idWharehouse'}),
			inventory: $resource('http\://localhost\:8080/GeMA/stores/inventory'),

		}
	});
})()