<?php
defined('BASEPATH') OR exit('No direct script access allowed');

    class Empleados_model extends CI_Model
    {
        public function __construct() {
                parent::__construct();
        }
        public function get( $id = NULL ) {
            if ( ! is_null( $id ) ) {
                $query = $this->db  ->select( "*" )
                                    ->from( "V_Empleado" )
                                    ->where( "IDEmpleado" , $id )
                                    ->get();
                if ( $query->num_rows( ) === 1 ) {
                    return $query->row_array( );
                }
                return NULL;
            }
            $query = $this->db->select( "*" )->from( "V_Empleado" )->get();
            if ( $query->num_rows( ) > 0 ) {
                return $query->result_array( );
            }
            return NULL;
        }
        public function in_get( $id = NULL ) {
            if ( ! is_null( $id ) ) {
                $query = $this->db  ->select( "*" )
                                    ->from( "V_Empleado_Deleter" )
                                    ->where( "IDEmpleado" , $id )
                                    ->get();
                if ( $query->num_rows( ) === 1) {
                    return $query->row_array( );
                }
                return NULL;
            }
            $query = $this->db  ->select( "*" )
                                ->from( "V_Empleado_Deleter" )
                                ->get();
            if ( $query->num_rows( ) > 0 ) {
                return $query->result_array( );
            }
            return NULL;
        }
        public function repartidores_get( ) {
            $query = $this->db  ->select("id_empleado , nombre , apellido_paterno , apellido_materno")
                                ->from( "empleados" )
                                ->where( "tipo_empleado" , "R" )
                                ->get();
            if ( $query->num_rows( ) > 0 ) {
                return $query->result_array( );
            }
            return NULL;
        }
        public function save( $empleado ) {
            $this->db   ->set( $this->_setEmpleado( $empleado ) )
                        ->insert( "Empleado" );
            if ( $this->db->affected_rows( ) ===1 ) {
                return $this->db->insert_id( );
            }
            return NULL;
        }
        public function update( $empleado ) {
            $this->db   ->set( $this->_setEmpleado( $empleado ) )
                        ->where( "IDEmpleado" , $empleado["id"] )
                        ->update("Empleado" );
            if ($this->db->affected_rows()===1) {
                return TRUE;
            }
            return NULL;
        }
        public function delete( $id )
        {
            $this->db->query("CALL desactivarEmpleado($id)");
            //$this->db->call_function( 'desactivarEmpleado' , $id );
            if ( $this->db->affected_rows( ) === 1 ) {
                return TRUE;
            }
            return NULL;
        }

        public function activar($id)
        {
            $this->db->query("CALL  activarEmpleado($id)");
            //$this->db->call_function( 'ActivarEmpleado' , $id );
            if ( $this->db->affected_rows( ) === 1 ) {
                return TRUE;
            }
            return NULL;
        }

        private function _setEmpleado( $empleado )
        {
            return array(
                "Nombre"          => $empleado["nombre"],
                "ApellidoPaterno" => $empleado["apellido_paterno"],
                "ApellidoMaterno" => $empleado["apellido_materno"],
                "Usuario"         => $empleado["usuario"],
                "IDCargo"         => $empleado["cargo"],
                "Calle"           => $empleado["calle"],
                "NumExterior"     => $empleado["num_ext"],
                "NumInterior"     => $empleado["num_int"],
                "Colonia"         => $empleado["colonia"],
                "CodigoPostal"    => $empleado["codigo_postal"],
                "Email"           => $empleado["email"],
                "Telefono"        => $empleado["telefono"],
                "Celular"         => $empleado["celular"],
                "Foto"            => $empleado["foto"],
                
            );
        }
    }

