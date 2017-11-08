(function(){
	gema.factory('PostRepository',function($resource){
		return {
			post: $resource('http\://localhost\:8080/GeMA/post/:idPost/',{idPost: '@idPost'},
				{
					'update':{
						method:'PUT',
					}
				}),

			//postUser: $resource('http\://localhost\:8080/GeMA/post/byuser/:idUser/',{idUser: '@idUser'})
		}
	});
})()