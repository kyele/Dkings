<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require APPPATH . "/libraries/REST_Controller.php";

class Login extends REST_Controller
{
    public function __construct() {
        parent::__construct();
        $this->load->model( "Login_model" );
        $this->load->library( 'form_validation' );
    }
    public function index(){
        //$this->load->view("login");
    }
    //logueamos usuarios con codeigniter y angularjs
    public function loginUser_post() {
        if( $this->input->post( "email" ) && $this->input->post( "password" ) ) {
            $this->form_validation->set_rules( 'password' , 'password' , 'min_length[3]' );
            $this->form_validation->set_rules( 'email' , 'email' , 'required|valid_email' );
            if($this->form_validation->run() == false){
                //echo json_encode(array("respuesta" => "incomplete_form"));
                $data = array(
                    'errors'        => validation_errors(' ',' '),
                    'statusError'   => TRUE,
                    "respuesta"     =>"incomplete_form"
                );
                echo json_encode($data);
            } else {
                $email      = $this->input->post( "email" );
                $password   = $this->input->post( "password" );
                $loginUser  = $this->Login_model->loginUser( $email , $password );
                if( ! is_null( $loginUser ) ) {
                    $usuario_data = array(
                       'IDEmpleado'         => $loginUser[0]["id_usuario"],
                       'Usuario'            => $loginUser[0]["usuario"],
                       'Email'              => $loginUser[0]["usuario"],
                       'logueado'           => TRUE
                    );
                    $this->session->set_userdata($usuario_data);
                    //var_dump($this->session->userdata( 'logueado' ));
                    $this->response( array( "respuesta"=>$loginUser ) , 200) ;
                    //echo json_encode( array( "respuesta" => $loginUser ) );
                }else {
                    echo json_encode( array( "respuesta" => "failed" ) );
                }
            }
        }else {
            echo json_encode( array( "respuesta" => "incomplete_form" ) );
        }
    }

    public function logueado_get() {
        if( $this->session->userdata( 'logueado' ) ) {
            //$id  = $this->session->userdata('IDEmpleado');
            echo json_encode( array( "respuesta"=>$this->session->userdata() ) , 200) ;
            //$this->load->view('usuarios/logueado', $data);
        }else {
            echo json_encode( array( "respuesta" => NULL ) );
        }
   }

    public function logoutUser_get(){
        $this->session->sess_destroy();
    }
}