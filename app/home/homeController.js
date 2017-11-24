(function(){
	gema.controller('HomeController', function($stateParams, $state, $mdDialog, 
			$translate,$http,$scope, $timeout, $mdSidenav,
			UserRepository, CompanyRepository,CompanyTypeRepository){

		// console.log("idLogged: " + $stateParams.idLogged);
		
		this.user = UserRepository.user.get({id: $stateParams.idLogged});

		CompanyRepository.companyUser.get({idUser: $stateParams.idLogged}).$promise.then(function(data){
			// console.log("Empresa");
			// console.log(data);
			localStorage.company = JSON.stringify(data);				
		});

		this.announceClick = function(index) {
		    $mdDialog.show(
		      $mdDialog.alert()
		        .title('You clicked!')
		        .content('You clicked the menu item at index ' + index)
		        .ok('Nice')
		    );
		};

		this.logout = function(){
			delete localStorage.token;
			delete localStorage.user;
			$http.defaults.headers.common.Authorization = '';
			$state.go('login');
		};

		$scope.toggleLeft = buildToggler('left');
	    //$scope.toggleRight = buildToggler('right');

	    function buildToggler(componentId) {
	      return function() {
	        $mdSidenav(componentId).toggle();
	      };
	    }

		/*this.switchLanguage = function (key) {
    		$translate.use(key);
  		};*/
	});
})()