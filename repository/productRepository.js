(function(){
	gema.factory('ProductRepository',function($resource){
		return {
			product: $resource('http\://localhost\:8080/GeMA/product/:idProduct/',{idProduct: '@idProduct'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()