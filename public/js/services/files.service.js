
angular.module( 'appDkings' )
    .service('upload', upload );
upload.$inject = [ "$http" , "$q" , 'routeServices'];
function upload ( $http , $q , routeServices) {
    return {
            uploadFile              : function( file , destino ) {
            var path_server         = routeServices.PathServer + "index1.php/";
            var data                = new FormData();
            data.append( "destino"   , destino );
            data.append( "file"      , file );
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http.post( path_server + "files/index" , data , {
                    headers: { "Content-type": undefined },
                    transformRequest: angular.identity
                })
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        }
    };
};