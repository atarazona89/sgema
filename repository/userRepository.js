(function(){
	gema.factory('UserRepository', function($resource){
		return {
			user: $resource('http\://localhost\:8080/GeMA/user/:id',{id: '@id'},
				{
					'update':{
						method:'PUT',
					}
				}),
		};
	});
})()