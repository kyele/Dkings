<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login_model extends CI_Model{
    public function __construct(){
        parent::__construct();
    }

    public function loginUser($email,$password){
        $clave          = "clave";
        $ident          = mcrypt_module_open('cast-128', '', 'ecb', '');
        $long_iniciador = mcrypt_enc_get_iv_size($ident);
        $inicializador  = mcrypt_create_iv ($long_iniciador, MCRYPT_RAND);
        mcrypt_generic_init($ident, $clave, $inicializador);
        $password       = mcrypt_generic($ident, $password);
        mcrypt_module_close($ident);
        $password       = base64_encode ($password);
        $this->db->where("usuario", $email); 
        $this->db->where("contraseña", $password);
        $query = $this->db->get("usuarios");
        if($query->num_rows() == 1){
            $query = $this->db->select( "*" )
                              ->from( "usuarios" )
                              ->where( "usuario" , $email )
                              ->where( "contraseña" , $password )
                              ->get();
            if ( $query->num_rows( ) > 0 ) {
                return $query->result_array( );
            }
            return NULL;
        }else{
            return false;
        }
    }
}