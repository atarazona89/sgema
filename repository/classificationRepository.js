(function(){
	gema.factory('ClassificationRepository',function($resource){
		return {
			classification: $resource('http\://localhost\:8080/GeMA/classification/:idClassification/',{idClassification: '@idClassification'},
				{
					'update':{
						method:'PUT',
					}
				})

		}
	});
})()