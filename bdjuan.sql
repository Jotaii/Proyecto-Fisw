-- MySQL dump 10.13  Distrib 5.6.30, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: fiswgoku
-- ------------------------------------------------------
-- Server version	5.6.30-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Alumno`
--

DROP TABLE IF EXISTS `Alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Alumno` (
  `id_alumno` int(8) NOT NULL AUTO_INCREMENT,
  `rut_alumno` varchar(13) NOT NULL,
  `nombre_alumno` varchar(30) NOT NULL,
  `apellido_p_alumno` varchar(50) NOT NULL,
  `apellido_m_alumno` varchar(50) NOT NULL,
  `nac_alumno` date NOT NULL,
  `categoria_alumno` int(1) DEFAULT '0',
  `foto_perfil_alumno` varchar(255) DEFAULT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `id_alumno` (`id_alumno`),
  UNIQUE KEY `rut_alumno` (`rut_alumno`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alumno`
--

LOCK TABLES `Alumno` WRITE;
/*!40000 ALTER TABLE `Alumno` DISABLE KEYS */;
INSERT INTO `Alumno` VALUES (1,'000000010','Federico','Santa Maria','Carrera','1845-08-15',0,NULL,''),(2,'189360517','Francisco','Perez','Castro','0000-00-00',0,'1','goku'),(3,'40.234.543-1','wd','4','0','1940-03-03',0,NULL,'wd.4.234'),(4,'12.432.123-3','a','a','a','1111-11-11',0,NULL,'a.a.432'),(5,'14.654.234-3','w','w','w','1111-11-11',0,NULL,'w.w.654');
/*!40000 ALTER TABLE `Alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contenido`
--

DROP TABLE IF EXISTS `Contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Contenido` (
  `id_contenido` int(10) NOT NULL AUTO_INCREMENT,
  `multimedia` text,
  `informacion` text,
  `descripcion` text,
  `categoria1_cont` int(1) NOT NULL DEFAULT '0',
  `categoria2_cont` int(1) NOT NULL DEFAULT '0',
  `categoria3_cont` int(1) NOT NULL DEFAULT '0',
  `categoria4_cont` int(1) NOT NULL DEFAULT '0',
  `id_ramo` int(10) NOT NULL,
  `nombre_contenido` varchar(100) DEFAULT NULL,
  UNIQUE KEY `id_contenido` (`id_contenido`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contenido`
--

LOCK TABLES `Contenido` WRITE;
/*!40000 ALTER TABLE `Contenido` DISABLE KEYS */;
INSERT INTO `Contenido` VALUES (1,'multimediaaa','Mucha informacion relevante por aqui por alla loremp insup jajaajj xddddd saludos, yo no soy el culpable','Curso de introduccion a la fisica clasica',1,1,1,1,2,'Cultura de la fisica'),(2,'multimediaaa','Mucha informacion relevante por aqui por alla loremp insup jajaajj xddddd saludos, yo no soy el culpable','Curso que ayuda a catarsear',0,1,1,1,2,'Catarsis de la fisica'),(3,'multimediaaa','Mucha informacion relevante por aqui por alla loremp insup jajaajj xddddd saludos, yo no soy el culpable','Aprenda sexualidad junto al doctor vegeta',0,0,1,0,2,'Estrogenos fisica'),(5,'mucha multi','La relatividad general fue publicada por Einstein en 1915, presentada como conferencia en la Academia de Ciencias Prusiana el 25 de noviembre. La teoría generaliza el principio de relatividad de Einstein para un observador arbitrario. Esto implica que las ecuaciones de la teoría deben tener una forma de covariancia más general que la covariancia de Lorentz usada en la teoría de la relatividad especial. Además de esto, la teoría de la relatividad general propone que la propia geometría del espacio-tiempo se ve afectada por la presencia de materia, de lo cual resulta una teoría relativista del campo gravitatorio. De hecho la teoría de la relatividad general predice que el espacio-tiempo no será plano en presencia de materia y que la curvatura del espacio-tiempo será percibida como un campo gravitatorio.','Curso que trata de la fisica cuantica y la fisica relativista',1,1,1,1,1,'Relatividad General');
/*!40000 ALTER TABLE `Contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Feedback` (
  `id_feedback` int(10) NOT NULL AUTO_INCREMENT,
  `f_categoria` int(10) NOT NULL,
  `f_esquema` int(10) NOT NULL,
  `f_respuestas` varchar(255) NOT NULL,
  `f_fecha_emision` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `id_ramo` int(10) NOT NULL,
  `id_alumno` int(8) NOT NULL,
  UNIQUE KEY `id_feedback` (`id_feedback`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Feedback`
--

LOCK TABLES `Feedback` WRITE;
/*!40000 ALTER TABLE `Feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `Feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profesor`
--

DROP TABLE IF EXISTS `Profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profesor` (
  `id_profesor` int(4) NOT NULL AUTO_INCREMENT,
  `rut_profesor` varchar(13) NOT NULL,
  `nombre_profesor` varchar(30) NOT NULL,
  `apellido_p_profesor` varchar(50) NOT NULL,
  `apellido_m_profesor` varchar(50) NOT NULL,
  `nac_profesor` date NOT NULL,
  `institucion_profesor` varchar(100) NOT NULL DEFAULT 'No informa',
  `foto_perfil_profesor` varchar(255) DEFAULT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  PRIMARY KEY (`id_profesor`),
  UNIQUE KEY `id_profesor` (`id_profesor`),
  UNIQUE KEY `rut_profesor` (`rut_profesor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profesor`
--

LOCK TABLES `Profesor` WRITE;
/*!40000 ALTER TABLE `Profesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `Profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profesor_Ramo`
--

DROP TABLE IF EXISTS `Profesor_Ramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Profesor_Ramo` (
  `Profesorid_profesor` int(4) NOT NULL,
  `Ramoid_ramo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profesor_Ramo`
--

LOCK TABLES `Profesor_Ramo` WRITE;
/*!40000 ALTER TABLE `Profesor_Ramo` DISABLE KEYS */;
/*!40000 ALTER TABLE `Profesor_Ramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ramo`
--

DROP TABLE IF EXISTS `Ramo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ramo` (
  `id_ramo` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_ramo` varchar(255) NOT NULL,
  `semestre_ramo` varchar(6) NOT NULL,
  `departamento` varchar(30) NOT NULL,
  PRIMARY KEY (`id_ramo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ramo`
--

LOCK TABLES `Ramo` WRITE;
/*!40000 ALTER TABLE `Ramo` DISABLE KEYS */;
INSERT INTO `Ramo` VALUES (1,'Fis 140','4','Fisica'),(2,'Fis 110','3','Fisica'),(3,'Fis 100','2','Fisica');
/*!40000 ALTER TABLE `Ramo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ramo_Alumno`
--

DROP TABLE IF EXISTS `Ramo_Alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Ramo_Alumno` (
  `Ramoid_ramo` int(10) NOT NULL,
  `Alumnoid_alumno` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ramo_Alumno`
--

LOCK TABLES `Ramo_Alumno` WRITE;
/*!40000 ALTER TABLE `Ramo_Alumno` DISABLE KEYS */;
INSERT INTO `Ramo_Alumno` VALUES (1,1),(2,1),(3,1),(2,2),(3,2),(1,2);
/*!40000 ALTER TABLE `Ramo_Alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuario` (
  `nombre_usuario` varchar(50) NOT NULL,
  `password_usuario` text NOT NULL,
  `tipo_usuario` int(1) NOT NULL DEFAULT '0',
  `mail_usuario` varchar(100) NOT NULL,
  PRIMARY KEY (`nombre_usuario`),
  UNIQUE KEY `nombre_usuario` (`nombre_usuario`),
  UNIQUE KEY `mail_usuario` (`mail_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES ('a.a.432','123',0,'a@a.com'),('goku','12345',1,'goku@goku.com'),('w.w.654','123',0,'w@w.com'),('wd.4.234','123',0,'wd@40.com');
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-07 14:30:16
