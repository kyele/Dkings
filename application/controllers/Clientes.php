<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

	class Clientes extends REST_Controller
	{
		public function __construct()
		{
				parent::__construct();
				$this->load->model( 'Clientes_model' );
				$this->load->library( 'form_validation' );
		}

		public function index_get()
		{	

			$clientes = $this->Clientes_model->get();
			if ( ! is_null( $clientes ) ) 
			{
				$this->response( array( "response"=>$clientes ) , 200 );
			} 
			else 
			{ 
				$this->response( array( "response"=>"no hay Clientes" ) , 400 );
			}
		}

		public function create_post() 
		{
			if ( ! $this->post( "cliente" ) ) 
			{
				$this->response( NULL , 404 );
			} 

			$ClienteID = $this->Clientes_model->save( $this->post( "cliente" ) );
	       
			if ( ! is_null( $ClienteID ) ) {
				$this->response( array( "response"=>$ClienteID ) , 200) ;
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
		
		public function find_get( $id )
		{	
			$cliente = $this->Clientes_model->get( $id );
			if ( ! is_null( $cliente ) ) 
			{
				$this->response( array( "response" => $cliente ) , 200 );
			}
	
			if ( ! is_null( $cliente ) ) {
				$this->response( array( "response" => $cliente ) , 200 );
			} else {
				$this->response( array( "response" => "Ha ocurrido un error" ) , 400 );
			}
		}
		public function update_put()
		{	
			if(! $this->post( "cliente" ))
			{
				$this->response(NULL,400);
			}	
			$update = $this->Clientes_model->update( $this->post('cliente') );
			if( ! is_null( $update ) ) {
				$this->response( array( "response"=>"Cliente actualizado" ) , 200 );
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
			}
		}
		public function delete_post($id)
		{
			if ( !$id ) {
				$this->response( NULL , 401 );
			}

			$delete = $this->Clientes_model->delete( $id );

			if ( ! is_null( $delete ) )  {
				$this->response( array( "response"=>"Cliente Eliminado" ) , 200 );
			} else {
				$this->response( array( "error"=>"Ha ocurrido un error" ) , 402 );
			}
		}

		public function activar_post( $id ) {
		if ( !$id ) {
			$this->response( NULL , 401 );
		}
		$activar = $this->Clientes_model->activar( $id );
		if ( ! is_null( $activar ) )  {
			$this->response( array( "response"=>"Cliente Activado" ) , 200 );
		} else {
			$this->response( array( "error"=>"Ha ocurrido un error" ) , 402 );
		}
	}

		
	}