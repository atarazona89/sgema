(function(){
	gema.factory('LoginRepository', function($resource){
		return {
			login: $resource('http\://localhost\:8080/GeMA/login')
		};
	});
})()