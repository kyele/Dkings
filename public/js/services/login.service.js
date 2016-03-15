angular.module( 'appDkings' )
    .service( "sesionesControl" , sesionesControl );
sesionesControl.$inject = [];
 function sesionesControl() {
    return {
        //obtenemos una sesión //getter
        get : function( key ) {
            return sessionStorage.getItem(key)
        },
        //creamos una sesión //setter
        set : function( key , val ) {
            return sessionStorage.setItem(key, val)
        },
        //limpiamos una sesión
        unset : function( key ) {
            return sessionStorage.removeItem(key)
        }
    }
};

angular.module( 'appDkings' )
    .service( "authUsers" , authUsers );
authUsers.$inject = [ '$http' , '$rootScope' , '$location' , '$state' , 'sesionesControl', 'routeServices' , '$resource' ];
function authUsers( $http , $rootScope , $location , $state , sesionesControl , routeServices , $resource ) {
    var cacheSession        = function( email , id_empleado ) {
        sesionesControl.set( "userLogin" , true);
        sesionesControl.set( "email" , email );
        sesionesControl.set( "id" , id_empleado );
    }
    var unCacheSession      = function( ) {
        sesionesControl.unset( "userLogin" );
        sesionesControl.unset( "email" );
    }
    var rootCacheSession    = function( ) {
        $rootScope.email    = sesionesControl.get( "email" );
    }
    var path_server         = routeServices.PathServer + "index1.php/";
    var loguedIn            = $resource( path_server + "login/logueado" , {}, {
        verifica: {
            method: 'GET',
        }
    });
    return {
        login               : function( user ) {
            return $http( {
                url:        path_server + "login/loginUser",
                method:     "POST",
                data :      "email=" + user.email + "&password=" + user.password ,
                headers:    { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).success( function( data ) {
                if( data.respuesta.length == 1 ) {
                    cacheSession(   data.respuesta[0].Email ,
                                    data.respuesta[0].IDEmpleado
                                );
                    rootCacheSession();
                    swal({
                        type: "success",
                        title: "",
                        text: "Bienvenido "+user.email+" !, Buen dia!",
                        timer: 2500,
                        showConfirmButton: false
                    });
                    $state.go( 'home');
                } else if( data.respuesta === "incomplete_form" ){
                    var mensaje = data.errors;
                    swal( "", mensaje , "error" );
                } else if( data.respuesta == false ){
                    swal( "", "Su contraseña o nombre de usuario son incorrectos", "warning" );
                }
            }).error( function() {
                //console.log("fallo");
                //$location.path("/")
            })
        },
        //función para cerrar la sesión del usuario
        logout              : function( ) {
            return $http({
                url : path_server + "login/logoutUser" ,
            }).success( function( ){
                //eliminamos la sesión de sessionStorage
                unCacheSession( );
                $location.path( "/login" );
            });
        },
        //función que comprueba si la sesión userLogin almacenada en sesionStorage existe
        isLoggedIn          : function( ) {
            return sesionesControl.get( "userLogin" );
        },
        rootCacheSession    : function( ) {
            $rootScope.email             = sesionesControl.get( "email" );
            $rootScope.id_empleado       = sesionesControl.get( "id" );
        },
        verifica: function( success , fail ) {
            return loguedIn.verifica(
                function( data ) {
                    success( data.respuesta );
                }, function( data ) {
                    fail( data.respuesta );
                }
            );
        },
    }
};