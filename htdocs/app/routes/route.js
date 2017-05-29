angular
    .module('demo.Routes', ['ngRoute'])
    .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];

function config($routeProvider, $locationProvider) {

    $locationProvider.html5Mode({
        enabled:true,
        requireBase:false
    });

    //Configuramos las rutas de la aplicación
    $routeProvider
        .when('/', { 
            
        })
       
       
        .otherwise({ redirectTo: '/' });
}