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
    .controller( 'ProductosCreateCtrl' , ProductosCreateCtrl );

ProductosCreateCtrl.$inject = [ '$state' , '$scope' , 'productosServices' , 'upload' ];

function ProductosCreateCtrl( $state , $scope , productosServices , upload ) {

    var producto                        = this;
    producto.productos                  = [];
    producto.categorias                 = [];
    producto.imagen_destino             = 'images/gallery/';
    producto.imagen_destino_miniatura   = 'images/gallery/miniatura/';
    var datos                           = {};
    datos.datos_form                    = {};
    $(":file").filestyle({iconName: "glyphicon-inbox"});
    $(":file").filestyle('placeholder', 'Selecciona una imagen');

    producto.uploadFile = function( ) {
        datos.datos_form.nombre                 = producto.nombre_producto;
        datos.datos_form.url_imagen             = producto.imagen_destino+producto.image_name;
        datos.datos_form.url_imagen_miniatura   = producto.imagen_destino_miniatura+producto.image_name;
        datos.datos_form.categorias             = [];
        datos.datos_form.categorias             = datos.datos_form.categorias.concat( producto.categorias );
        var file                                = producto.file;
        //console.log(file);
        productosServices.agregar_producto( {producto:datos.datos_form} ,
            function( data ) {
                if( data.response ) {
                    if (file) {
                          producto.PromesaImagen( data.response );
                    }else{
                        swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
                        //$state.go( 'empleado_single' , { id: id_empleado } );
                    };      
                }
            }, function( data ) {
                swal( "", "Algo ha salido mal, intente mas tarde!" , "error" );
            }
        );
    };

    producto.agrega_categoria = function( id_categoria ) {
        indice = producto.categorias.indexOf( id_categoria );
        if ( indice != (-1) ) {
            producto.categorias.splice( indice , 1 )
        } else {
            producto.categorias.push( id_categoria );
        }
    }
    producto.listar = function( ) {
        productosServices.mostrar(
            function( data ) {
                if( data.response.length > 0 ) {
                    producto.productos    = data.response;
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }
    producto.PromesaImagen = function( id_producto ) {
        upload.uploadFile( producto.file  , producto.imagen_destino )
        .then(function(res) {
            if ( res.response === 'Imagen guardada correctamente' ) {
                swal("Guardado!", "Se ha guardado correctamente la informacion!", "success");
                $state.go( 'galeria_list' , { id: id_producto } );
            } else {
                swal("Guardado!", "Se ha guardado correctamente la informacion! , pero la imagen no pudo ser guardada", "warning");
                $state.go( 'galeria_list' );
            }
        }, function(error) {
            swal( "Error", "Algo ha salido mal, intente mas tarde!" , "warning" );
        });
    }
    $("#file").on("change", function() {
        var image = new Image();
        $("#vista_previa").html('');
        var archivos    = document.getElementById('file').files;
        var navegador   = window.URL || window.webkitURL;

        for( var x = 0; x < archivos.length ; x++ ) {
            var size = archivos[x].size;
            var type = archivos[x].type;
            var name = archivos[x].name;
            producto.image_name = archivos[x].name;
            if(size > 1024 * 1024) {
                $("#vista_previa").append("<p style='color: red'> El archivo"+name+" supera el tamaño maximo permitido (1MB)</p>");
            } else if( type != 'image/jpg' && type != 'image/jpeg' && type != 'image/png' && type != 'image/gif' ) {
                $("#vista_previa").append("<p style='color: red'> El archivo"+name+" no es un archivo permitido (jpg, jpeg, png, gif)</p>");
            } else {
                var objeto_url = window.URL.createObjectURL(archivos[x]);
                $("#vista_previa").append("<img src="+objeto_url+" width='250' height='250'>"); 
            }
        }
    })
    producto.listar();
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
    .controller( 'ProductosListCtrl' , ProductosListCtrl );

ProductosListCtrl.$inject = [ '$state' , '$scope' , 'productosServices' ];

function ProductosListCtrl( $state , $scope , productosServices ) {

    var galeria         = this;
    galeria.galerias    = [];
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
    galeria.listar = function( ) {
        productosServices.listar(
            function( data ) {
                //console.log(data.response);
                if( data.response.length != null ) {
                    galeria.galerias = galeria.galerias.concat( data.response );
                    $scope.$parent.noCargar = false;
                }
            }
        );
    }

    galeria.ordenarPor = function(orden) {
        galeria.ordenSeleccionado = orden;
    };
    galeria.listar();

};
