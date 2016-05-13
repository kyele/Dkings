<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Files extends REST_Controller
	{
		public function __construct() {
				parent::__construct();
				//$this->load->model( 'Galeria_model' );
		}
		public function index_post() {
			//var_dump($_FILES);
			if ( !$_FILES && !$_POST ) {
				$this->response( NULL , 404 );
			} else {
				$temporal 	= $_FILES["file"]["tmp_name"];
				$nombre 	= $_FILES["file"]["name"];
				$tipo 		= $_FILES["file"]["type"];
				switch( $tipo ) {
					case 'image/jpg':
					case 'image/jpeg':
						$original = imagecreatefromjpeg($temporal);
					break;
					case 'image/png':
						$original = imagecreatefrompng($temporal);
					break;
					case 'image/gif':
						$original = imagecreatefromgif($temporal);
					break;
				}
				$ancho_originial 	= imagesx($original);
				$alto_originial 	= imagesy($original);
				//creamos un lienzo vacio (foto destino 250 x 189 )
				$copia 				= imagecreatetruecolor( 290 , 220 );
				//copiar origina -> copia
				//1-2 destino-original
				//3-4 eje X_Y pegado --> 0,0
				//5-6 eje X_Y original --> 0,0
				//7-8 ancho-alto destino --> width - height
				//9-10 ancho-alto original --> width - height
				imagecopyresampled( $copia , $original , 0 , 0 , 0 , 0 , 290 , 220 , $ancho_originial , $alto_originial );

				//exportar imagen/guardar imagen
				switch( $tipo ) {
					case 'image/jpg':
					case 'image/jpeg':
						if( imagejpeg( $copia , "images/gallery/miniatura/".$nombre , 100 ) ){
							$resultado = true;
						} else {
							$resultado = false;
						}
					break;
					case 'image/png':
						if( imagepng( $copia , "images/gallery/miniatura/".$nombre , 10 ) ){
							$resultado = true;
						} else {
							$resultado = false;
						}
					break;
					case 'image/gif':
						if( imagegif( $copia , "images/gallery/miniatura/".$nombre , 100 ) ){
							$resultado = true;
						} else {
							$resultado = false;
						}
					break;
				}
			}
			if ( $resultado ) {
				move_uploaded_file( $temporal , $_POST["destino"].$nombre );
				$this->response( array( "response"=>"Imagen guardada correctamente" ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
	}

?>