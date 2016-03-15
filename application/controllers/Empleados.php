<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

    class Empleados extends REST_Controller
    {
        public function __construct()
        {
                parent::__construct();
                $this->load->model( 'Empleados_model' );
                $this->load->library( 'form_validation' );
        }

        public function index_get()
        {   

            $empleados = $this->Empleados_model->get();
            if ( ! is_null( $empleados ) ) 
            {
                $this->response( array( "response"=>$empleados ) , 200 );
            } 
            else 
            { 
                $this->response( array( "response"=>"no hay Empleados" ) , 400 );
            }
        }
        public function repartidores_get( ) {
            $repartidor = $this->Empleados_model->repartidores_get( );
            if ( ! is_null( $repartidor ) ) {
                $this->response( array( "response"=>$repartidor ) , 200 );
            } else {
                $this->response( array( "response"=>"no hay Terapeutas" ) , 400 );
            }
        }
        public function create_post() 
        {
            if ( ! $this->post( "empleado" ) ) 
            {
                $this->response( NULL , 404 );
            } 

            $ClienteID = $this->Empleados_model->save( $this->post( "empleado" ) );
           
            if ( ! is_null( $ClienteID ) ) {
                $this->response( array( "response"=>$ClienteID ) , 200) ;
            } else {
                $this->response( array( "error"=>"Ha ocurrido un error" ) , 400 );
            }
        }
        
        public function find_get( $id )
        {   
            $empleado = $this->Empleados_model->get( $id );
            if ( ! is_null( $empleado ) ) 
            {
                $this->response( array( "response" => $empleado ) , 200 );
            }
    
            if ( ! is_null( $empleado ) ) {
                $this->response( array( "response" => $empleado ) , 200 );
            } else {
                $this->response( array( "response" => "Ha ocurrido un error" ) , 400 );
            }
        }
        public function update_put()
        {   
            if(! $this->post( "empleado" ))
            {
                $this->response(NULL,400);
            }   
            $update = $this->Empleados_model->update( $this->post('empleado') );
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

            $delete = $this->Empleados_model->delete( $id );

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
        $activar = $this->Empleados_model->activar( $id );
        if ( ! is_null( $activar ) )  {
            $this->response( array( "response"=>"Cliente Activado" ) , 200 );
        } else {
            $this->response( array( "error"=>"Ha ocurrido un error" ) , 402 );
        }
    }

        
    }