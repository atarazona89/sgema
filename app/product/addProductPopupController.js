(function(){
	gema.controller('AddProductPopupController', function(
		$state,$stateParams,$translate,$http,$scope,$mdDialog,$sce,$window,	

		ProductRepository,

		ProductTypeRepository, StorageRepository, MeasurementRepository, MaterialRepository,
		ClassificationRepository
		){

		var global = this;

		var productRequest = {};

		var otherType = 0;
		var productTypeElegido = null;
		var productTypeRequest = [];

		var otherMaterial = 0;
		var materialElegido = null;
		var materialrequest = [];

		var otherStorage = 0;
		var storageElegido = null;
		var storageRequest = [];

		var otherMeasurement = 0;
		var measurementElegido = null;
		var measurementRequest = [];

		var otherClassification = 0;
		var classificationElegido = null;
		var classificationRequest = [];

		// ================ Primeras listas ==========================//
		ProductTypeRepository.type.query()
		.$promise.then(function(data){
			global.ltProuctTypes = data;
		});

		MaterialRepository.material.query()
		.$promise.then(function(data){
			global.ltMaterials = data;
		});

		StorageRepository.storage.query()
		.$promise.then(function(data){
			global.ltStorages = data;
		});

		MeasurementRepository.measurement.query()
		.$promise.then(function(data){
			global.ltMeasurements = data;
		});

		ClassificationRepository.classification.query()
		.$promise.then(function(data){
			global.ltClassifications = data;
		});

		//======== Mostradores ====================//
		this.showOtherType = function(value){
			global.otherType = value;
			if(value != 1){
				global.productTypeRequest = [];
			}
		};

		this.showOtherMaterial = function(value){
			global.otherMaterial = value;
			if(value != 1){
				global.materialRequest = [];
			}
		};

		this.showOtherStorage = function(value){
			global.otherStorage = value;
			if(value != 1){
				global.storageRequest = [];
			}
		};

		this.showOtherMeasurement = function(value){
			global.otherMeasurement = value;
			if(value != 1){
				global.measurementRequest = [];
			}
		};

		this.showOtherClassification = function(value){
			global.otherClassification = value;
			if(value != 1){
				global.classificaitonRequest = [];
			}
		};

		//================= Savers =========================//
		this.saveProductType = function(ProductTypeRequest){
			if (ProductTypeRequest.name != "" && ProductTypeRequest.name != null) {
				ProductTypeRepository.type.save(ProductTypeRequest)
				.$promise.then(function(newProductType){
					global.ltProuctTypes.push(newProductType);
					global.productRequest.type = newProductType;
					global.showOtherType(0);
				});
			}
		};

		this.saveMaterial = function(materialrequest){
			if (materialrequest.name != null && materialrequest.name != "") {
				MaterialRepository.material.save(materialrequest)
				.$promise.then(function(data){
					global.ltMaterials.push(data);
					global.productRequest.material = data;
					global.showOtherMaterial(0);
				});
			}
		};

		this.saveStorage = function(storageRequest){
			if (storageRequest.type != null && storageRequest.type != "") {
				StorageRepository.storage.save(storageRequest)
				.$promise.then(function(data){
					global.ltStorages.push(data);
					global.productRequest.storage = data;
					global.showOtherStorage(0);
				});
			}
		};

		this.saveMeasurement = function(measurementRequest){
			console.log(measurementRequest);
			if (measurementRequest.name != null && measurementRequest.name != ""){
				MeasurementRepository.measurement.save(measurementRequest)
				.$promise.then(function(data){
					global.ltMeasurements.push(data);
					global.productRequest.measurement = data;
					global.showOtherMeasurement(0);
				});
			}
		};

		this.saveClassification = function(classificationRequest){
			if (classificationRequest.name != null && classificationRequest.name != "") {
				ClassificationRepository.classification.save(classificationRequest)
				.$promise.then(function(data){
					global.ltClassifications.push(data);
					global.productRequest.classification = data;
					global.showOtherClassification(0);
				});
			}
		};

		//================= Product ==========================//
		this.saveProduct = function(productRequest){
			// console.log("Aceptado");
			ProductRepository.product.save(productRequest)
			.$promise.then(function(data){
				$mdDialog.hide(data);
			});
				// $mdDialog.hide(productRequest);
		};

		this.cancel = function(){
			$mdDialog.cancel();
		};

	});
})()