/**
    *   This controller catch the information of the customers
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      13/02/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [$location]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    cliente.listar( .... )
*/
angular.module( 'appDkings' )
    .controller( 'categoriasCreateCtrl' , categoriasCreateCtrl );

categoriasCreateCtrl.$inject = [ '$state' , '$scope' , 'productosServices' ];

function categoriasCreateCtrl( $state , $scope , productosServices ) {

    var categoria            = this;
    categoria.datos_form     = {};

    categoria.agregar = function( ) {

        categoria.datos_form.nombre             = categoria.nombre_categoria;
        categoria.datos_form.descripcion        = categoria.descripcion_categoria;
        console.log(categoria.datos_form);

        productosServices.agregar_categoria( {categoria:categoria.datos_form} ,
            function( data ) {
                swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
                $state.go( 'categoria_list' );
            }, function( data ) {
                console.log( data.message );
            }
        );
    };

};
/**
    *   This controller catch the information of the customers
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      13/02/2015
    *   @version    1
    *   @access     public
    *   @param      Service [$resource]
    *   @param      Service [$location]
    *   @param      Service [routeServices]
    *   @return     
    *   @example    cliente.listar( .... )
*/
angular.module( 'appDkings' )
    .controller( 'CategoriasListCtrl' , CategoriasListCtrl );

CategoriasListCtrl.$inject = [ '$state' , '$scope' , 'productosServices' ];

function CategoriasListCtrl( $state , $scope , productosServices ) {

    var categoria           = this;
    categoria.categorias    = [];

    /**
    *   This function call data of the customers.
    *   @author     Cesar Herrera <kyele936@gmail.com>
    *   @since      13/29/2015
    *   @version    1
    *   @access     public
    *   @param      galerias.datos_form
    *   @return
    *   @example    galeria.agregar( .... )
    */
    categoria.listar = function( ) {
        productosServices.mostrar(
            function( data ) {
                console.log( data.response );
                if( data.response && data.response.length > 0 ) {
                    categoria.categorias    = data.response;
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }
    categoria.listar();
};