<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Clientes_model extends CI_Model
	{
		public function __construct() {
				parent::__construct();
		}
		public function get( $id = NULL )
		{
			if ( ! is_null( $id ) ) 
			{
				$query = $this->db->select("*")
								  ->from("clientes")
								  ->where("id_cliente",$id)
								  ->get();
				if ( $query->num_rows( ) > 0) {
					return $query->result_array( );
				}
				return NULL;
			}
			$query = $this->db->select( "*" )
							  ->from( "clientes" )
							  ->get();
			if ( $query->num_rows( ) > 0 ) {
				return $query->result_array( );
			}
			return NULL;
		}
		
		public function save( $cliente )
		{
			$this->db->set( $this->_setCliente( $cliente ) )
					 ->insert( "clientes" );
			if ( $this->db->affected_rows( ) ===1 ) {
				return $this->db->insert_id( );
			}
			return NULL;
		}
		public function update( $cliente )
		{
			$this->db->set( $this->_setCliente( $cliente ) )
					 ->where( "id_cliente" , $cliente["id"] )
					 ->update("clientes" );
			if ($this->db->affected_rows()===1) {
				return TRUE;
			}
			return NULL;
		}
		public function delete($id)
		{
			$data = array(
               'status' => 'inactivo'
            	);
			$this->db->where('id_cliente', $id)
    				 ->update('clientes',$data);  
			//$this->db->call_function( 'ActivarCliente' , $id );
			if ( $this->db->affected_rows( ) === 1 ) 
			{
				return TRUE;
			}
			return NULL;
		}

		public function activar( $id ) 
		{
			$data = array(
               'status' => 'activo'
            	);
			$this->db->where('id_cliente', $id)
					 ->update('clientes',$data);  
			//$this->db->call_function( 'ActivarCliente' , $id );
			if ( $this->db->affected_rows( ) === 1 ) 
			{
				return TRUE;
			}
			return NULL;
		}

		private function _setCliente( $costumer )
		{
			return array(
				//Datos para facturacion
				"rfc"    						=> $costumer["rfc"],
				"razon_social"		  			=> $costumer["razon_social"],
				"pais_facturacion"    			=> $costumer["pais_facturacion"],
				"estado_facturacion"    		=> $costumer["estado_facturacion"],
				"municipio_facturacion"    		=> $costumer["municipio_facturacion"],
				"calle_facturacion"    			=> $costumer["calle_facturacion"],
				"numero_exterior_facturacion"   => $costumer["numero_exterior_facturacion"],
				"numero_interior_facturacion"   => $costumer["numero_interior_facturacion"],
				"codigo_postal_facturacion"    	=> $costumer["codigo_postal_facturacion"],
				"colonia_facturacion"    		=> $costumer["colonia_facturacion"],
				//Datos de venta
				"num_tarjeta"		  			=> $costumer["num_tarjeta"],
				"nombre"		  				=> $costumer["nombre"],
				"apellido_paterno" 				=> $costumer["apellido_paterno"],
				"apellido_materno" 				=> $costumer["apellido_materno"],
				"pais"    						=> $costumer["pais"],
				"estado"    					=> $costumer["estado"],
				"municipio"    					=> $costumer["municipio"],
				"calle"  		  				=> $costumer["calle"],
				"numero_exterior"     			=> $costumer["numero_exterior"],
				"numero_interior"     			=> $costumer["numero_interior"],
				"colonia"         				=> $costumer["colonia"],
				"codigo_postal"    				=> $costumer["codigo_postal"],
				"correo"    					=> $costumer["correo"],
			);
		}
	}