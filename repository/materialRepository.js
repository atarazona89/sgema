(function(){
	gema.factory('MaterialRepository',function($resource){
		return {
			material: $resource('http\://localhost\:8080/GeMA/material/:idMaterial/',{idMaterial: '@idMaterial'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()