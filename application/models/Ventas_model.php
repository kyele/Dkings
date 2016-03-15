<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Ventas_model extends CI_Model
	{
		public function __construct() {
				parent::__construct();
		}
		public function get( $id = NULL )
		{
			if ( ! is_null( $id ) ) 
			{
				$query = $this->db->select("*")
								  ->from("vst_venta_details")
								  ->where("id_venta",$id)
								  ->order_by( "id_venta" , "desc" )
								  ->get();
				if ( $query->num_rows( ) > 0) {
					return $query->result_array( );
				}
				return NULL;
			}
			$query = $this->db->select( "*" )
							  ->from( "vst_venta_details" )
							  ->order_by( "id_venta" , "desc" )
							  ->get();
			if ( $query->num_rows( ) > 0 ) {
				return $query->result_array( );
			}
			return NULL;
		}
		
		public function save( $venta )
		{
			$this->db->set( $this->_setVenta( $venta ) )
					 ->insert( "ventas" );
			if ( $this->db->affected_rows( ) ===1 ) {
				return $this->db->insert_id( );
			}
			return NULL;
		}
		public function update( $venta )
		{
			$this->db->set( $this->_setVenta( $venta ) )
					 ->where( "id_venta" , $venta["id"] )
					 ->update("ventas" );
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
			$this->db->where('id_venta', $id);
    		$this->db->update('ventas',$data);  
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
			$this->db->where('id_venta', $id);
    		$this->db->update('ventas',$data);  
			if ( $this->db->affected_rows( ) === 1 ) 
			{
				return TRUE;
			}
			return NULL;
		}

		private function _setVenta( $venta )
		{
			return array(
				"precio"		  			=> $venta["precio"],
				"forma_pago" 				=> $venta["forma_pago"],
				"fecha" 					=> $venta["fecha"],
				"cliente_id_cliente"  		=> $venta["cliente_id_cliente"],
				"empleado_id_empleado"     	=> 1,
				"repartidor_id_repartidor"  => $venta["repartidor_id_repartidor"],
			);
		}
	}