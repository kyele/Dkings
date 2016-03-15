<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Ventas extends REST_Controller {

		function __construct()
		{
			parent::__construct();
			$this->load->model( 'Ventas_model' );
		}

		public function index_get()
		{	

			$ventas = $this->Ventas_model->get();
			if ( ! is_null( $ventas ) ) 
			{
				$this->response( array( "response"=>$ventas ) , 200 );
			} 
			else 
			{ 
				$this->response( array( "response"=>"no hay ventas" ) , 400 );
			}
		}

		public function create_post() 
		{
			if ( ! $this->post( "venta" ) ) 
			{
				$this->response( NULL , 404 );
			} 

			$id_venta = $this->Ventas_model->save( $this->post( "venta" ) );
	       
			if ( ! is_null( $id_venta ) ) {
				$this->response( array( "response"=>$id_venta ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
		
		public function find_get( $id )
		{	
			$venta = $this->Ventas_model->get( $id );
			if ( ! is_null( $venta ) ) 
			{
				$this->response( array( "response" => $venta ) , 200 );
			}

			if ( ! is_null( $venta ) ) {
				$this->response( array( "response" => $venta ) , 200 );
			} else {
				$this->response( array( "response" => "Ha ocurrido un error" ) , 400 );
			}
		}
		public function update_put()
		{	
			if(! $this->post( "venta" ))
			{
				$this->response(NULL,400);
			}	
			$update = $this->Ventas_model->update( $this->post('venta') );
			if( ! is_null( $update ) ) {
				$this->response( array( "response"=>"Venta actualizado" ) , 200 );
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
		public function delete_post($id)
		{
			if ( !$id ) {
				$this->response( NULL , 401 );
			}

			$delete = $this->Ventas_model->delete( $id );

			if ( ! is_null( $delete ) )  {
				$this->response( array( "response"=>"Venta Eliminado" ) , 200 );
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 402 );
			}
		}

		public function activar_post( $id ) {
			if ( !$id ) {
				$this->response( NULL , 401 );
			}
			$activar = $this->Ventas_model->activar( $id );
			if ( ! is_null( $activar ) )  {
				$this->response( array( "response"=>"Venta Activado" ) , 200 );
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 402 );
			}

		}
}

/* End of file Ventas.php */
/* Location: ./application/controllers/Ventas.php */