angular.module( 'appDkings' )
    .controller( "loginCtrl" , loginCtrl );
loginCtrl.$inject = [ '$scope' , '$rootScope' , 'sha1' , '$location' , 'authUsers']
function loginCtrl( $scope , $rootScope , sha1 , $location , authUsers ) {
    var login       = this;
    authUsers.flash = "";
    //función que llamamos al hacer sumbit al formulario
    login.login     = function( ) {
        login.user.password = sha1.encode(login.user.pass);
        authUsers.login( login.user );
    }
    login.session     = function( ) {
        if( authUsers.isLoggedIn() ) {
            login.datos = authUsers.rootCacheSession();
            //console.log(login.datos);
        }
    }
    login.session();
};
angular.module( 'appDkings' )
    .controller( "logoutCtrl" , logoutCtrl );
logoutCtrl.$inject = [ '$scope' , 'authUsers' ];
function logoutCtrl( $scope , authUsers ) {
    var logout      = this;
    logout.logout   = function( ) {
        authUsers.logout();
    }
};