angular.module('appDkings')
    .service('routeServices', routeServices );

routeServices.$inject = [ '$location' ];

function routeServices( $location ) {

    var path_angular, path_server;
    path_angular = $location.absUrl();
    path_server = path_angular.substring( 0, path_angular.indexOf('index.html') != -1? path_angular.indexOf('index.html'):path_angular.indexOf('#'));

    this.PathServer = path_server;
};