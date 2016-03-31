<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Galeria_model extends CI_Model {

		public function __construct() {
			parent::__construct();
		}

		public function get( $id = NULL ) {
			if( ! is_null( $id ) ) {
				$query = $this->db 	->select( "*" )	
									->from( "imagenes" )
									->where( "id_imagen" , $id )
									->get( );
				if( $query->num_rows( ) === 1 ) {
					return $query->row_array( );
				}
				return NULL;
			}
			$query = $this->db 	->select( "*" )	
								->from( "imagenes" )
								//->join( "imagenes_categorias", 'imagenes_categorias.imagen_id = imagenes.id_imagen' )
								->get( );
			if( $query->num_rows( ) > 0 ) {
				for( $i=0 ; $i < $query->num_rows() ; $i++ ) {
					 $categorias = $this->db->select( 'imagenes_categorias.categoria_id , categoria_productos.nombre_categoria' )
					 						->join( "categoria_productos" , 'categoria_productos.id_categoria_producto = imagenes_categorias.categoria_id' )
					 						->from( "imagenes_categorias" )
					 						->where( "imagen_id" , $query->result_array()[$i]["id_imagen"] )->get( );
					 $cat = [];
					 $cat = $categorias->result_array();
					 $imagenes[$i] = [
					 	"id_imagen"    			=> $query->result_array()[$i]["id_imagen"],
					 	"nombre_imagen" 		=> $query->result_array()[$i]["nombre_imagen"],
					 	"url_imagen" 			=> $query->result_array()[$i]["url_imagen"],
					 	"url_imagen_miniatura" 	=> $query->result_array()[$i]["url_imagen_miniatura"],
					 	"status_imagen" 		=> $query->result_array()[$i]["status_imagen"],
					 	"categorias"			=> $cat
					 ];
				}
				//var_dump($imagenes);
				return $imagenes;
			}
			return NULL;
		}		
		public function save_categoria_producto( $categorias , $id_producto )
		{
			foreach ( $categorias as $categoria ) {
				$this->db->set( $this->_setCategoriaProducto( $id_producto , $categoria ) )->insert( "imagenes_categorias" );
			}
			
			/*if ( $this->db->affected_rows( ) === 1 ) {
				return $this->db->insert_id( );
			}
			return NULL;*/
		}
		public function save_producto( $producto  )
		{
			$this->db->set( $this->_setProducto( $producto ) )->insert( "imagenes" );
			if ( $this->db->affected_rows( ) === 1 ) {

				$id_producto = $this->db->insert_id( );
				foreach ( $producto["categorias"] as $categoria ) {
					$this->db->set( $this->_setCategoriaProducto( $id_producto , $categoria ) )->insert( "imagenes_categorias" );
				}/*
				$file = $img_producto["file"]["name"];
				if(!is_dir("files/"))
					mkdir("files/", 0777);
				if( move_uploaded_file($img_producto["file"]["tmp_name"], "images/galeria/".$file) ) {
					
				}*/
				return $id_producto;
			}
			return NULL;
		}
		public function get_categorias( $id = NULL ) {
			if( ! is_null( $id ) ) {
				$query = $this->db->select( "*" )->from( "categoria_productos" )->where( "id" , $id )->get( );
				if( $query->num_rows( ) === 1 ) {
					return $query->row_array( );
				}
				return NULL;
			}
			$query = $this->db->select( "*" )->from( "categoria_productos" )->get( );
			if( $query->num_rows( ) > 0 ) {
				return $query->result_array( );
			}
			return NULL;
		}
		public function save_categoria( $categoria )
		{
			$this->db->set( $this->_setCategoria( $categoria ) )->insert( "categoria_productos" );
			if ( $this->db->affected_rows( ) === 1 ) {
				return $this->db->insert_id( );
			}
			return NULL;
		}
		public function update_categoria( $id , $categoria )
		{
			$this->db->set( $this->_setCategoria( $categoria ) )->where( "IDcategoria" , $id )->update("categoria" );
			if ($this->db->affected_rows()===1 ) {
				return TRUE;
			}
			return NULL;
		}
		public function delete_categoria($id)
		{
			$this->db->query("CALL desactivarcategoria($id)");
			//$this->db->call_function( 'desactivarcategoria' , $id );
			if ( $this->db->affected_rows( ) === 1 ) {
				return TRUE;
			}
			return NULL;
		}
		private function _setCategoria( $categoria )
		{
			return array(
				"nombre_categoria"		  	=> $categoria["nombre"],
				"descripcion_categoria" 	=> $categoria["descripcion"],
				"status_categoria" 			=> 1,
			);
		}
		private function _setProducto( $producto )
		{
			return array(
				"nombre_imagen"			=> $producto["nombre"],
				"url_imagen" 			=> $producto["url_imagen"],
				"url_imagen_miniatura" 	=> $producto["url_imagen_miniatura"],
				"status_imagen" 		=> 1,
			);
		}
		private function _setCategoriaProducto( $producto_id , $categoria_id )
		{
			return array(
				"imagen_id"		  			=> $producto_id,
				"categoria_id"		  		=> $categoria_id,				
			);
		}
	}

