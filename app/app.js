var gema;

(function(){
    gema = angular.module('gema', ['ui.router','ngResource',
        'ngMaterial','ngMdIcons','pascalprecht.translate','angular-jwt']);

    //===== CONFIGURACION DE APP. 1ER PPASO: REDIRECCIONAMIENTOS ====//
    gema.config(function($stateProvider, $urlRouterProvider, $translateProvider, $mdThemingProvider){

        //===== THEMING =====//

        $mdThemingProvider.theme('default')
            .primaryPalette('green')
            .accentPalette('orange');

        //===================//

        $urlRouterProvider.otherwise('/login');

        $stateProvider.state('login', {
            url: '/login',      
            templateUrl: 'app/login/login.html'
        });
        
        $stateProvider.state('home',{
            url: '/home/:idLogged',
            templateUrl: 'app/home/home.html'   
        });

        // Estado de prueba!!!
        $stateProvider.state('home.main',{
            url: '/main/',
            templateUrl: 'app/main/main.html',
        });

        $stateProvider.state('home.wharehouse',{
            url: '/main/wharehouse',
            templateUrl: 'app/wharehouse/wharehouse.html',
        });

        $stateProvider.state('home.company',{
            url: '/main/company',
            templateUrl: 'app/company/company.html',
        });

        

        //===== Main page =====//

        

        ///===== CONFIGURACION DE TRADUCCIONES ====//
        $translateProvider.useStaticFilesLoader({
           prefix: 'data/',
           suffix: '.json'
        });

        $translateProvider.preferredLanguage('es_VE');
        $translateProvider.useSanitizeValueStrategy('escape');

        //===== INYECTOR DE HEADER =====//

        
        //===== FIN DEL INYECTOR =====//

    });
})()