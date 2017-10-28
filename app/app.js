var gema;

(function(){
    gema = angular.module('gema', ['ui.router','ngResource',
        'ngMaterial','ngMdIcons','pascalprecht.translate','angular-jwt']);

    //===== CONFIGURACION DE APP. 1ER PPASO: REDIRECCIONAMIENTOS ====//
    gema.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/login/login.html'
        });

        $stateProvider.state('home',{
            url: '/home/:idLogged',
            templateUrl: 'app/home/home.html'
        });

        

        //===== Main page =====//

        

        //===== CONFIGURACION DE TRADUCCIONES ====//
        //$translateProvider.useStaticFilesLoader({
        //    prefix: 'data/',
        //    suffix: '.json'
        //});

        //$translateProvider.preferredLanguage('es_VE');
        //$translateProvider.useSanitizeValueStrategy('escape');

        //===== INYECTOR DE HEADER =====//

        
        //===== FIN DEL INYECTOR =====//

    }]);
})()