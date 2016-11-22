-- MySQL dump 10.13  Distrib 5.6.30, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: final
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
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Alumno`
--

LOCK TABLES `Alumno` WRITE;
/*!40000 ALTER TABLE `Alumno` DISABLE KEYS */;
INSERT INTO `Alumno` VALUES (1,'000000010','Federico','Santa Maria','Carrera','1845-08-15',0,NULL,''),(2,'189360517','Francisco','Perez','Castro','0000-00-00',1,'1','goku'),(3,'12312312','vegeta','perez','castro','2016-11-10',0,NULL,'vegeta.perez.undefined'),(4,'12.312.312-9','gohan','perez','castro','2016-11-18',0,NULL,'gohan.perez.312'),(5,'18.936.051-7','Gotens','perez','castro','2016-11-19',0,NULL,'Gotens.perez.936'),(6,'12.312.312-7','Francisco','Mena','Toro','2016-11-19',0,NULL,'Francisco.Mena.312'),(7,'11.111.111-1','Francisco','Alvial','Concha','2016-11-26',2,NULL,'Francisco.Alvial.111'),(8,'98.765.432-1','Pene','Quiere','Remojada','2016-11-23',2,NULL,'Pene.Quiere.765'),(9,'19.283.848.5','Miguel','Huichaman','Bakan','2016-11-25',2,NULL,'Miguel.Huichaman.283'),(10,'13.232.233-2','Hermoso','Brillante','Apuesto','2016-11-25',2,NULL,'Hermoso.Brillante.232'),(11,'99.999.999-9','Freezer','Hermoso','jjajaja','2016-11-24',2,NULL,'Freezer.Hermoso.999'),(12,'49.182.347-8','Ste','Men','caca','2016-11-25',2,NULL,'Ste.Men.182'),(13,'10.293.948-2','Excre','Mento','asdas','2016-11-24',2,NULL,'Excre.Mento.293'),(14,'52.949.934-8','prueba','qla','nose','2016-11-25',2,NULL,'prueba.qla.949'),(15,'6.543.234-2','xaaaaa','xaaaaa','asdasdas','2016-11-25',2,NULL,'xaaaaa.xaaaaa.543'),(16,'53.423.294-8','ultima','prueba','mato','2016-11-24',2,NULL,'ultima.prueba.423'),(17,'03.576.938-6','ahora','si','concha','2016-11-27',2,NULL,'ahora.si.576'),(18,'29.837.573-6','ahora','vamos','jajaja','2016-11-26',2,NULL,'ahora.vamos.837'),(19,'09.475.937-2','prueba','muerte','caca','2016-11-24',2,NULL,'prueba.muerte.475'),(20,'45.867.983-2','porfavor','funciona','asdasd','2016-12-04',2,NULL,'porfavor.funciona.867'),(21,'93.487.598-2','siii','vamos','sdfsdf','2016-11-27',2,NULL,'siii.vamos.487'),(22,'46.573.984-0','kaka','kaka','assdasd','2016-11-26',0,NULL,'kaka.kaka.573'),(23,'98.753.843-2','caca','seca','asdasd','2016-11-26',0,NULL,'caca.seca.753'),(24,'12.873.918-7','sexo','descontrolado','asdasd','2016-11-27',0,NULL,'sexo.descontrolado.873'),(25,'66.666.666-6','ADMIN','ADMIN','ADMIN','2016-11-26',4,NULL,'ADMIN.ADMIN.666'),(26,'19.078.818-0','Fabian','Fernandez','Figueroa','1995-05-03',4,NULL,'Fabian.Fernandez.078');
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
  `descripcion` text,
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
INSERT INTO `Contenido` VALUES (1,'Curso de introduccion a la fisica clasica',2,'Cultura de la fisica'),(2,'Curso que ayuda a catarsear',2,'Catarsis de la fisica'),(3,'Aprenda sexualidad junto al doctor vegeta',2,'Estrogenos fisica'),(5,'Curso que trata de la fisica cuantica y la fisica relativista',1,'Relatividad General');
/*!40000 ALTER TABLE `Contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Feedback`
--

DROP TABLE IF EXISTS `Feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Feedback` (
  `id_feedback` int(100) NOT NULL AUTO_INCREMENT,
  `feedback_categoria` int(1) NOT NULL,
  `feedback_contenido` text NOT NULL,
  `feedback_fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre_usuario` varchar(50) NOT NULL,
  `id_contenido` int(10) NOT NULL,
  PRIMARY KEY (`id_feedback`),
  KEY `nombre_usuario` (`nombre_usuario`),
  KEY `id_contenido` (`id_contenido`),
  CONSTRAINT `Feedback_ibfk_1` FOREIGN KEY (`nombre_usuario`) REFERENCES `Usuario` (`nombre_usuario`),
  CONSTRAINT `Feedback_ibfk_2` FOREIGN KEY (`id_contenido`) REFERENCES `Contenido` (`id_contenido`)
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ramo`
--

LOCK TABLES `Ramo` WRITE;
/*!40000 ALTER TABLE `Ramo` DISABLE KEYS */;
INSERT INTO `Ramo` VALUES (1,'Fis 140','4','Fisica'),(2,'Fis 110','3','Fisica'),(3,'Fis 100','2','Fisica'),(4,'Akatalawa','2016-2','Estudios Humanísticos');
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
INSERT INTO `Ramo_Alumno` VALUES (1,1),(2,1),(3,1),(2,2),(3,2),(1,2),(3,4),(2,4),(2,7),(3,7),(3,8),(2,10),(2,11),(2,13),(2,14),(2,15),(2,16),(2,18),(2,17),(2,19),(2,21),(2,25),(1,26),(2,26),(4,26);
/*!40000 ALTER TABLE `Ramo_Alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sub_Contenido`
--

DROP TABLE IF EXISTS `Sub_Contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Sub_Contenido` (
  `id_subcontenido` int(11) DEFAULT NULL,
  `tipo_subcontenido` varchar(100) DEFAULT NULL,
  `ruta_contenido` varchar(500) DEFAULT NULL,
  `id_contenido` int(11) DEFAULT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `fecha_creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nombre_subcontenido` varchar(50) NOT NULL,
  KEY `id_cont` (`id_contenido`),
  CONSTRAINT `Sub_Contenido_ibfk_1` FOREIGN KEY (`id_contenido`) REFERENCES `Contenido` (`id_contenido`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sub_Contenido`
--

LOCK TABLES `Sub_Contenido` WRITE;
/*!40000 ALTER TABLE `Sub_Contenido` DISABLE KEYS */;
INSERT INTO `Sub_Contenido` VALUES (1,'Ejercicio','/',1,'','2016-11-21 22:52:24',''),(2,'Motivacion','/',1,'','2016-11-21 22:52:24',''),(3,'Analogias','/analogias',1,'','2016-11-21 22:52:24',''),(4,'Definicion de conceptos clave','/conceptos clave',1,'','2016-11-21 22:52:24',''),(4,'Experimentos a realizar','/experimentos_a_realizar',1,'','2016-11-21 22:52:24',''),(5,'Que aprenderas con el topico','/aprendere_con_el_topico',1,'','2016-11-21 22:52:24',''),(6,'Video motivacional','/video_motivacional1',1,'','2016-11-21 22:52:24',''),(7,'Video motivacional','/video_motivacional2',1,'','2016-11-21 22:52:24',''),(8,'Video motivacional','/video_motivacional3',1,'','2016-11-21 22:52:24',''),(8,'Base teorica','/base_teorica',1,'','2016-11-21 22:52:24',''),(9,'Conocimientos previos','/conocimiento_previo1',1,'','2016-11-21 22:52:24',''),(10,'Conocimientos previos','/conocimiento_previo2',1,'','2016-11-21 22:52:24',''),(11,'Principio y teoria','/principio_teoria',1,'','2016-11-21 22:52:24',''),(12,'Documentacion adicional','/documento1',1,'','2016-11-21 22:52:24',''),(13,'Documentacion adicional','/documento2',1,'','2016-11-21 22:52:24',''),(14,'Documentacion adicional','/documento3',1,'','2016-11-21 22:52:24',''),(15,'Que problema resuelve el topico','/que_problema_resuelve',1,'','2016-11-21 22:52:24',''),(16,'Datos necesarios para los ejercicios del tema','/datos_necesarios1',1,'','2016-11-21 22:52:24',''),(17,'Datos necesarios para los ejercicios del tema','/datos_necesarios2',1,'','2016-11-21 22:52:24',''),(18,'Ejemplos','/ejemplo1',1,'','2016-11-21 22:52:24',''),(19,'Ejemplos','/ejemplo2',1,'','2016-11-21 22:52:24',''),(20,'Preguntas del tipo \'Que pasa si...?\'','/que_pasa_si',1,'','2016-11-21 22:52:24',''),(21,'Lluvia de ideas','/lluvia_idea1',1,'','2016-11-21 22:52:24',''),(22,'Lluvia de ideas','/lluvia_idea2',1,'','2016-11-21 22:52:24',''),(23,'Lluvia de ideas','/lluvia_idea3',1,'','2016-11-21 22:52:24',''),(24,'Lluvia de ideas','/lluvia_idea4',1,'','2016-11-21 22:52:24',''),(25,'Lluvia de ideas','/lluvia_idea5',1,'','2016-11-21 22:52:24',''),(26,'Lluvia de ideas','/lluvia_idea6',1,'','2016-11-21 22:52:24',''),(27,'Lluvia de ideas','/lluvia_idea7',1,'','2016-11-21 22:52:24',''),(28,'Lluvia de ideas','/lluvia_idea8',1,'','2016-11-21 22:52:24',''),(29,'Analogias','/analogia2',1,'','2016-11-21 22:52:24',''),(30,'Experimentos a realizar','/exp_a_realizar2',1,'','2016-11-21 22:52:24',''),(31,'Experimentos a realizar','/exp_a_realizar3',1,'','2016-11-21 22:52:24',''),(32,'Experimentos a realizar','/exp_a_realizar4',1,'','2016-11-21 22:52:24',''),(33,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual1',1,'','2016-11-21 22:52:24',''),(34,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual2',1,'','2016-11-21 22:52:24',''),(35,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual3',1,'','2016-11-21 22:52:24',''),(36,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual4',1,'','2016-11-21 22:52:24',''),(37,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual5',1,'','2016-11-21 22:52:24',''),(38,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual6',1,'','2016-11-21 22:52:24',''),(39,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual7',1,'','2016-11-21 22:52:24',''),(40,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual8',1,'','2016-11-21 22:52:24',''),(41,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual9',1,'','2016-11-21 22:52:24',''),(42,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual10',1,'','2016-11-21 22:52:24',''),(43,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual11',1,'','2016-11-21 22:52:24',''),(44,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual12',1,'','2016-11-21 22:52:24',''),(45,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual13',1,'','2016-11-21 22:52:24',''),(46,'Ejercicio del mapa conceptual','/ejer_mapa_conceptual14',1,'','2016-11-21 22:52:24','');
/*!40000 ALTER TABLE `Sub_Contenido` ENABLE KEYS */;
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
INSERT INTO `Usuario` VALUES ('ADMIN.ADMIN.666','12345',2,'fperezcastro1@gmail.com'),('ahora.si.576','12345',0,'klakalk@aslkd.com'),('ahora.vamos.837','12345',0,'ldkfjk@asdas.com'),('caca.seca.753','12345',0,'kjsdh@aaasns.com'),('Excre.Mento.293','12345',0,'kakaka@asdas.com'),('Fabian.Fernandez.078','fabian',0,'fabian.fernandez.13@sansano.usm.cl'),('Francisco.Alvial.111','12345',0,'franciscoperezcastro1@gmail.com'),('Francisco.Mena.312','12345',0,'francisco.mena.13@sansano.usm.cl'),('Freezer.Hermoso.999','12345',0,'aaaa@aaaa.com'),('gohan.perez.312','12345',0,'prueba@prueba.com'),('goku','12345',0,'goku@goku.com'),('Gotens.perez.936','12345',0,'aja@aja.com'),('Hermoso.Brillante.232','12345',0,'aaa@aaa.com'),('kaka.kaka.573','12345',0,'asdaxsdas@asd.com'),('Miguel.Huichaman.283','12345',0,'aa@aa'),('Palito.palotes.312','12345',0,'caca@caca.com'),('Pene.Quiere.765','12345',0,'a@a.com'),('porfavor.funciona.867','12345',0,'fsdf@sdfsd.com'),('prueba.cosita.936','12345',0,'chancho@chancho.com'),('prueba.muerte.475','12345',0,'askjd@dkfj.com'),('prueba.qla.949','12345',0,'asd@saasa.com'),('sexo.descontrolado.873','12345',0,'lkajdkjkjas@akljdsak.com'),('siii.vamos.487','12345',0,'fghfgh@sdfd.com'),('Ste.Men.182','12345',0,'asdasdas@assssd.com'),('ultima.prueba.423','12345',0,'lksdjf@skdj.com'),('vegeta.perez.undefined','12345',0,'asdasdas@asd.com'),('xaaaaa.xaaaaa.543','12345',0,'adadffg@gfdg');
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

-- Dump completed on 2016-11-21 20:07:47
