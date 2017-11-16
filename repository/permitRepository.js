(function(){
	gema.factory('PermitRepository',function($resource){
		return {
			permit: $resource('http\://localhost\:8080/GeMA/permit/:idPermit/',{idPermit: '@idPermit'},
				{
					'update':{
						method:'PUT',
					}
				}),
			permitWharehouse: $resource('http\://localhost\:8080/GeMA/permit/bywharehouse/:idWharehouse/',{idWharehouse: '@idWharehouse'})

		}
	});
})()