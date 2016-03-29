<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Galeria_model extends CI_Model {

		public function __construct() {
			parent::__construct();
		}

		public function get( $id = NULL ) {
			if( ! is_null( $id ) ) {
				$query = $this->db->select( "*" )->from( "imagenes" )->where( "id" , $id )->get( );
				if( $query->num_rows( ) === 1 ) {
					return $query->row_array( );
				}
				return NULL;
			}
			$query = $this->db->select( "*" )->from( "imagenes" )->get( );
			if( $query->num_rows( ) > 0 ) {
				//var_dump($query->result_array());
				//for( $i=0 ; $i < $query->num_rows() ; $i++ ) {
					 //= $this->db->select( "*" )->from( "imagenes" )->where( "id" , $id )->get( );
					$numbers = array ( "categorias"=>( "id"=>1) );
					$fruits = array ( "fruits"  => array ( "a" => "orange",
                                       "b" => "banana",
                                       "c" => "apple"
                                     ),
				      	            "holes"   => array (      "first",
				                                       5 => "second",
				                                            "third"
				                                     ),
					);
					$fruits = array_merge( $fruits , $numbers );
					var_dump($fruits);
					//var_dump($numbers);
					//array_push( $query->result_array()[$i] , "newkey"=>"newvalue" );
					//$query->result_array()[$i]=array("newkey"=>"newvalue") + $query->result_array()[$i]; 
				//}
				var_dump($query->result_array());
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

