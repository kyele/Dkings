/**
    *   this service allows us to manipulate the customer information
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      02/10/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    catalogosServices.getDep(function(data){.....}
*/
angular.module( 'appDkings' )
    .service( 'galeriaServices' , galeriaServices );
galeriaServices.$inject = [ '$resource' ]
function galeriaServices( $resource  ) {

    var galeria_agregar     = $resource( "http://localhost/Baracci/index1.php/galeria/index" , {}, {
            agregar_producto: {
                method: 'POST'
            }
        }),
        galeria_list        = $resource( "http://localhost/Baracci/index1.php/galeria/index" , {}, {
            listar: {
                method: 'GET'
            }
        }),
        categoria_list      = $resource( "http://localhost/Baracci/index1.php/categorias/index" , {}, {
            mostrar: {
                method: 'GET'
            }
        }),
        categoria_agregar     = $resource( "http://localhost/Baracci/index1.php/categorias/index" , {}, {
            agregar_categoria: {
                method: 'POST'
            }
        });
    return {
        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      09/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar_producto( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        agregar_producto: function( galeria , success, fail ) {
            return galeria_agregar.agregar_producto( galeria ,
                function( data ) {
                    success( data );
                }, function( data ) {
                    fail( data.data );
                }
            );
        },
        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      04/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [parametros]
        *   @param      Callbacks [callback]
        *   @return     promise
        *   @example    galeriaServices.modificar( datos_galeria , function( data ){ .... });
        */
        modificar: function( id , callback ) {
            return galeria_edit.modificar(
                {
                    id : id ,
                } ,
                function( data ) {
                    callback( data );
                }
            );
        },

        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        listar: function( callback ) {
            return galeria_list.listar(
                function( data ) {
                    callback( data );
                }
            );
        },

        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      13/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        mostrar: function( callback ) {
            return categoria_list.mostrar(
                function( data ) {
                    callback( data );
                }
            );
        },
        /**
        *   this function returns the promise that contains a json
        *   @author     Cesar Herrera <kyele936@gmail.com>
        *   @since      09/10/2015
        *   @version    1
        *   @access     public
        *   @param      jsonObject [galeria]
        *   @param      Callbacks [success]
        *   @param      Callbacks [fail]
        *   @return     promise
        *   @example    galeriaServices.agregar( {usuario: 'kyele', nombre: '1414', ....} , function( data ){ .... }, function( data ) { .... } )
        */
        agregar_categoria: function( galeria , success, fail ) {
            return categoria_agregar.agregar_categoria( galeria ,
                function( data ) {
                    success( data );
                }, function( data ) {
                    fail( data.data );
                }
            );
        },
    };
};