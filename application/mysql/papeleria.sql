-- phpMyAdmin SQL Dump
-- version 4.5.3.1
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 08-02-2016 a las 18:24:29
-- Versión del servidor: 10.0.21-MariaDB
-- Versión de PHP: 5.6.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `papeleria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `calle` varchar(45) NOT NULL,
  `numero_exterior` int(11) NOT NULL,
  `numero_interior` int(11) DEFAULT NULL,
  `colonia` varchar(45) NOT NULL,
  `codigo_postal` int(11) NOT NULL,
  `municipio` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `RFC` varchar(15) NOT NULL,
  `calle_facturacion` varchar(45) NOT NULL,
  `numero_exterior_facturacion` int(11) NOT NULL,
  `numero_interior_facturacion` int(11) DEFAULT NULL,
  `codigo_postal_facturacion` int(11) NOT NULL,
  `colonia_facturacion` varchar(45) NOT NULL,
  `municipio_facturacion` varchar(45) NOT NULL,
  `estado_facturacion` varchar(45) NOT NULL,
  `pais_facturacion` varchar(45) NOT NULL,
  `status` enum('activo','inactivo') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `nombre`, `apellido_paterno`, `apellido_materno`, `calle`, `numero_exterior`, `numero_interior`, `colonia`, `codigo_postal`, `municipio`, `estado`, `pais`, `RFC`, `calle_facturacion`, `numero_exterior_facturacion`, `numero_interior_facturacion`, `codigo_postal_facturacion`, `colonia_facturacion`, `municipio_facturacion`, `estado_facturacion`, `pais_facturacion`, `status`) VALUES
(1, '1', '1', '1', '1', 1, 1, '1', 1, '1', '1', '1', '1', '1', 1, 1, 1, '1', '1', '1', '1', 'activo'),
(2, '2', '2', '2', '2', 2, NULL, '2', 2, '2', '2', '2', '2', '2', 2, NULL, 2, '2', '2', '2', '2', 'activo'),
(3, '3', '3', '3', '3', 3, NULL, '3', 3, '3', '3', '3', '3', '3', 3, 3, 3, '3', '3', '3', '3', 'activo'),
(4, '4', '4', '4', '4', 4, NULL, '4', 4, '4', '4', '4', '4', '4', 4, 4, 4, '4', '4', '4', '4', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id_empleado` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `calle` varchar(45) NOT NULL,
  `numero_exterior` int(11) NOT NULL,
  `numero_interior` int(11) DEFAULT NULL,
  `colonia` varchar(45) NOT NULL,
  `codigo_postal` int(11) NOT NULL,
  `municipio` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id_empleado`, `nombre`, `apellido_paterno`, `apellido_materno`, `calle`, `numero_exterior`, `numero_interior`, `colonia`, `codigo_postal`, `municipio`, `estado`, `pais`, `correo`, `usuario`, `contraseña`) VALUES
(1, '1', '1', '1', '1', 1, NULL, '1', 1, '1', '1', '1', '1', '1', '1'),
(2, '2', '2', '2', '2', 2, 2, '2', 2, '2', '2', '2', '2', '2', '2'),
(3, '3', '3', '3', '3', 3, NULL, '3', 3, '3', '3', '3', '3', '3', '3'),
(4, '4', '4', '4', '4', 4, 4, '4', 4, '4', '4', '4', '4', '4', '4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `repartidores`
--

CREATE TABLE `repartidores` (
  `id_repartidor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellido_paterno` varchar(45) NOT NULL,
  `apellido_materno` varchar(45) NOT NULL,
  `calle` varchar(45) NOT NULL,
  `numero_exterior` int(11) NOT NULL,
  `numero_interior` int(11) DEFAULT NULL,
  `colonia` varchar(45) NOT NULL,
  `codigo_postal` int(11) NOT NULL,
  `municipio` varchar(45) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `pais` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `usuario` varchar(45) NOT NULL,
  `contraseña` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `repartidores`
--

INSERT INTO `repartidores` (`id_repartidor`, `nombre`, `apellido_paterno`, `apellido_materno`, `calle`, `numero_exterior`, `numero_interior`, `colonia`, `codigo_postal`, `municipio`, `estado`, `pais`, `correo`, `usuario`, `contraseña`) VALUES
(1, '1', '1', '1', '1', 1, 1, '1', 1, '1', '1', '1', '1', '1', '1'),
(2, '2', '2', '2', '2', 2, 2, '2', 2, '2', '2', '2', '2', '2', '2'),
(3, '3', '3', '3', '3', 3, NULL, '3', 3, '3', '3', '3', '3', '3', '3'),
(4, '4', '4', '4', '4', 4, NULL, '4', 4, '4', '4', '4', '4', '4', '4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventas`
--

CREATE TABLE `ventas` (
  `id_venta` int(11) NOT NULL,
  `precio` decimal(10,0) NOT NULL,
  `forma_pago` enum('Efectivo','Chequera','Credito','Debito','Transferencia') NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `cliente_id_cliente` int(10) UNSIGNED NOT NULL,
  `empleado_id_empleado` int(11) NOT NULL,
  `repartidor_id_repartidor` int(11) NOT NULL,
  `status` enum('activo','inactivo') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`);

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id_empleado`);

--
-- Indices de la tabla `repartidores`
--
ALTER TABLE `repartidores`
  ADD PRIMARY KEY (`id_repartidor`);

--
-- Indices de la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD PRIMARY KEY (`id_venta`),
  ADD KEY `fk_venta_cliente_idx` (`cliente_id_cliente`),
  ADD KEY `fk_venta_empleado1_idx` (`empleado_id_empleado`),
  ADD KEY `fk_venta_repartidor1_idx` (`repartidor_id_repartidor`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id_empleado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `repartidores`
--
ALTER TABLE `repartidores`
  MODIFY `id_repartidor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `ventas`
--
ALTER TABLE `ventas`
  MODIFY `id_venta` int(11) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ventas`
--
ALTER TABLE `ventas`
  ADD CONSTRAINT `fk_venta_cliente` FOREIGN KEY (`cliente_id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_venta_empleado1` FOREIGN KEY (`empleado_id_empleado`) REFERENCES `empleados` (`id_empleado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_venta_repartidor1` FOREIGN KEY (`repartidor_id_repartidor`) REFERENCES `repartidores` (`id_repartidor`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
