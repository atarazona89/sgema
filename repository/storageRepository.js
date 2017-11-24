(function(){
	gema.factory('StorageRepository',function($resource){
		return {
			storage: $resource('http\://localhost\:8080/GeMA/storage/:idStorage/',{idStorage: '@idStorage'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()