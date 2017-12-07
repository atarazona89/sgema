(function(){
	gema.factory('MeasurementRepository',function($resource){
		return {
			measurement: $resource('http\://localhost\:8080/GeMA/measurement/:idMeasurement/',{idMeasurement: '@idMeasurement'},
				{
					'update':{
						method:'PUT',
					}
				}),
			byproduct: $resource('http\://localhost\:8080/GeMA/measurement/byproduct/:idProduct/',{idProduct: '@idProduct'}),

		}
	});
})()