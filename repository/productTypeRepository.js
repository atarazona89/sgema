(function(){
	gema.factory('ProductTypeRepository',function($resource){
		return {
			type: $resource('http\://localhost\:8080/GeMA/producttype/:idProductType/',{idProductType: '@idProductType'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()