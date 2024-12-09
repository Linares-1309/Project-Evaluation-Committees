CREATE DATABASE  IF NOT EXISTS `comites-evaluacion` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `comites-evaluacion`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: comites-evaluacion
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comité-criterios`
--

DROP TABLE IF EXISTS `comité-criterios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comité-criterios` (
  `id_comité_criterios` int NOT NULL AUTO_INCREMENT,
  `id_comites_evaluación` int NOT NULL,
  `id_criterio` int NOT NULL,
  `cal_comité_criterios` varchar(5) NOT NULL,
  `create-time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_comité_criterios`),
  KEY `id_criterio_idx` (`id_criterio`),
  KEY `id_comites_evaluación_idx` (`id_comites_evaluación`),
  CONSTRAINT `fk_id_comites_evaluación` FOREIGN KEY (`id_comites_evaluación`) REFERENCES `comités-evaluación` (`id_comites_evaluación`),
  CONSTRAINT `fk_id_criterio` FOREIGN KEY (`id_criterio`) REFERENCES `criterios` (`id_criterio`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comité-criterios`
--

LOCK TABLES `comité-criterios` WRITE;
/*!40000 ALTER TABLE `comité-criterios` DISABLE KEYS */;
INSERT INTO `comité-criterios` VALUES (65,54,58,'1','2024-12-06 19:52:40'),(66,54,59,'1','2024-12-06 19:52:40'),(67,54,60,'10','2024-12-06 19:52:40'),(68,54,61,'8','2024-12-06 19:52:40'),(69,54,62,'9','2024-12-06 19:52:40'),(70,54,63,'9','2024-12-06 19:52:40'),(71,54,64,'1','2024-12-06 19:52:40'),(72,54,65,'3','2024-12-06 19:52:40'),(73,54,66,'3','2024-12-06 19:52:40'),(74,54,67,'2','2024-12-06 19:52:40'),(75,54,68,'Si','2024-12-06 19:52:40'),(76,54,69,'Si','2024-12-06 19:52:40'),(77,54,70,'Si','2024-12-06 19:52:40'),(78,54,71,'Si','2024-12-06 19:52:40'),(79,54,72,'Si','2024-12-06 19:52:40'),(80,54,73,'Si','2024-12-06 19:52:40'),(81,55,58,'1','2024-12-06 19:55:36'),(82,55,59,'2','2024-12-06 19:55:36'),(83,55,60,'10','2024-12-06 19:55:36'),(84,55,61,'10','2024-12-06 19:55:36'),(85,55,62,'9','2024-12-06 19:55:36'),(86,55,63,'8','2024-12-06 19:55:36'),(87,55,64,'8','2024-12-06 19:55:36'),(88,55,65,'9','2024-12-06 19:55:36'),(89,55,66,'7','2024-12-06 19:55:36'),(90,55,67,'7','2024-12-06 19:55:36'),(91,55,68,'Si','2024-12-06 19:55:36'),(92,55,69,'Si','2024-12-06 19:55:36'),(93,55,70,'Si','2024-12-06 19:55:36'),(94,55,71,'Si','2024-12-06 19:55:36'),(95,55,72,'Si','2024-12-06 19:55:36'),(96,55,73,'Si','2024-12-06 19:55:36'),(97,56,58,'2','2024-12-06 20:05:11'),(98,56,59,'10','2024-12-06 20:05:11'),(99,56,60,'9','2024-12-06 20:05:11'),(100,56,61,'8','2024-12-06 20:05:11'),(101,56,62,'9','2024-12-06 20:05:11'),(102,56,63,'7','2024-12-06 20:05:11'),(103,56,64,'8','2024-12-06 20:05:11'),(104,56,65,'8','2024-12-06 20:05:11'),(105,56,66,'10','2024-12-06 20:05:11'),(106,56,67,'9','2024-12-06 20:05:11'),(107,56,68,'Si','2024-12-06 20:05:11'),(108,56,69,'Si','2024-12-06 20:05:11'),(109,56,70,'Si','2024-12-06 20:05:11'),(110,56,71,'Si','2024-12-06 20:05:11'),(111,56,72,'Si','2024-12-06 20:05:11'),(112,56,73,'Si','2024-12-06 20:05:11'),(113,57,58,'10','2024-12-09 17:25:18'),(114,57,59,'9','2024-12-09 17:25:18'),(115,57,60,'8','2024-12-09 17:25:18'),(116,57,61,'7','2024-12-09 17:25:18'),(117,57,62,'6','2024-12-09 17:25:18'),(118,57,63,'5','2024-12-09 17:25:18'),(119,57,64,'4','2024-12-09 17:25:18'),(120,57,65,'3','2024-12-09 17:25:18'),(121,57,66,'2','2024-12-09 17:25:18'),(122,57,67,'1','2024-12-09 17:25:18'),(123,57,68,'No','2024-12-09 17:25:18'),(124,57,69,'No','2024-12-09 17:25:18'),(125,57,70,'No','2024-12-09 17:25:18'),(126,57,71,'Si','2024-12-09 17:25:18'),(127,57,72,'Si','2024-12-09 17:25:18'),(128,57,73,'Si','2024-12-09 17:25:18');
/*!40000 ALTER TABLE `comité-criterios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comités-evaluación`
--

DROP TABLE IF EXISTS `comités-evaluación`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comités-evaluación` (
  `id_comites_evaluación` int NOT NULL AUTO_INCREMENT,
  `fec_comité_evaluación` date NOT NULL,
  `Obs_Comite` varchar(255) NOT NULL,
  `id_idea` int NOT NULL,
  `Id_User` int NOT NULL,
  `create_time` timestamp NOT NULL,
  PRIMARY KEY (`id_comites_evaluación`),
  KEY `id_idea_idx` (`id_idea`) /*!80000 INVISIBLE */,
  KEY `Id_User_idx` (`Id_User`),
  CONSTRAINT `fk_id_idea` FOREIGN KEY (`id_idea`) REFERENCES `ideas` (`id_idea`),
  CONSTRAINT `Id_User` FOREIGN KEY (`Id_User`) REFERENCES `user` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comités-evaluación`
--

LOCK TABLES `comités-evaluación` WRITE;
/*!40000 ALTER TABLE `comités-evaluación` DISABLE KEYS */;
INSERT INTO `comités-evaluación` VALUES (54,'2024-12-06','lalalala',3,1107008520,'2024-12-06 19:52:40'),(55,'2024-12-06','lalalallalalal',4,1107008520,'2024-12-06 19:55:36'),(56,'2024-12-06','ffff',3,1107008520,'2024-12-06 20:05:11'),(57,'2024-12-09','Muy bien ',5,1107008520,'2024-12-09 17:25:18');
/*!40000 ALTER TABLE `comités-evaluación` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conjunto_criterios`
--

DROP TABLE IF EXISTS `conjunto_criterios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conjunto_criterios` (
  `id_conjunto_criterio` int NOT NULL AUTO_INCREMENT,
  `des_conjunto_criterio` varchar(80) NOT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_conjunto_criterio`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conjunto_criterios`
--

LOCK TABLES `conjunto_criterios` WRITE;
/*!40000 ALTER TABLE `conjunto_criterios` DISABLE KEYS */;
INSERT INTO `conjunto_criterios` VALUES (43,'FORMULACIÓN DE LA IDEA','2024-12-04 13:56:44'),(44,'INNOVACIÓN DE LA IDEA','2024-12-04 13:56:56'),(45,'VIABILIDAD DE LA IDEA EN EL MERCADO','2024-12-04 13:57:10'),(46,'CAPACIDAD DE ACOMPAÑAMIENTO DEL TECNOPARQUE','2024-12-04 13:57:18'),(47,'CAPACIDAD DE EJECUCIÓN DEL PROPONENTE O  POSIBLE TALENTO','2024-12-04 13:57:27');
/*!40000 ALTER TABLE `conjunto_criterios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `criterios`
--

DROP TABLE IF EXISTS `criterios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `criterios` (
  `id_criterio` int NOT NULL AUTO_INCREMENT,
  `des_criterio` varchar(255) NOT NULL,
  `id_conjunto_criterio` int NOT NULL,
  `create_time` timestamp NOT NULL,
  PRIMARY KEY (`id_criterio`),
  KEY `id_conjunto_criterio_idx` (`id_conjunto_criterio`),
  CONSTRAINT `id_conjunto_criterio` FOREIGN KEY (`id_conjunto_criterio`) REFERENCES `conjunto_criterios` (`id_conjunto_criterio`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterios`
--

LOCK TABLES `criterios` WRITE;
/*!40000 ALTER TABLE `criterios` DISABLE KEYS */;
INSERT INTO `criterios` VALUES (58,'Descripción clara y concisa del problema, necesidad u oportunidad a atender con la idea.',43,'2024-12-04 13:57:59'),(59,'Suficiente conocimiento sobre otros resultados que dan solución al problema, necesidad u oportunidad.',43,'2024-12-04 13:58:11'),(60,'Los objetivos de la idea contribuyen a la solución del problema, necesidad u oportunidad.',43,'2024-12-04 13:58:22'),(61,'Los resultados propuestos corresponden a los objetivos.',43,'2024-12-04 13:58:34'),(62,'El alcance de la propuesta esta corresponde con los objetivos.',43,'2024-12-04 13:58:45'),(63,'El proponente tiene claridad conceptual, técnica y metodológica de cómo obtener los resultados.',43,'2024-12-04 13:58:58'),(64,'El resultado propuesto por la idea presenta funcionalidades novedosas que generen cambio o ventaja con respecto a las soluciones que se encuentran en el entorno.',44,'2024-12-04 13:59:16'),(65,'El resultado propuesto por la idea tiene características que generan valor agregado a los productos, procesos y servicios, y contribuyen a la mejora de la productividad y competitividad de las personas o las organizaciones.',44,'2024-12-04 13:59:28'),(66,'El resultado propuesto tiene identificados usuario(s), consumidor(es), cliente(s) y mercados potenciales.',45,'2024-12-04 13:59:45'),(67,'Están definidos posibles canales de comercialización o de explotación del resultado propuestos.',45,'2024-12-04 13:59:55'),(68,'La idea puede ser acompañada técnica y metodológicamente por el Nodo del Tecnoparque',46,'2024-12-04 14:01:55'),(69,'El Nodo del Tecnoparque dispone profesionales con experticia para el acompañamiento de la idea.',46,'2024-12-04 14:02:05'),(70,'El Tecnoparque dispone de los materiales (insumos), equipos, servicios, para el acompañamiento de la idea.',46,'2024-12-04 14:02:15'),(71,'El resultado propuesto está enmarcado en el contexto institucional SENA, y en la normativa técnica y jurídica colombiana.',46,'2024-12-04 14:02:24'),(72,'El usuario dispone del talento humano con las competencias técnicas y disponibilidad para la ejecución de la idea.',47,'2024-12-04 14:02:42'),(73,'El usuario manifiesta el compromiso de suministrar  materiales (insumos) y servicios, con que no cuenta el Nodo de Tecnoparque, para la obtención de los resultados. ',47,'2024-12-04 14:02:52');
/*!40000 ALTER TABLE `criterios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ideas`
--

DROP TABLE IF EXISTS `ideas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ideas` (
  `id_idea` int NOT NULL AUTO_INCREMENT,
  `nom_idea` varchar(150) NOT NULL,
  `estado_idea` enum('Convocado','No convocado') DEFAULT 'No convocado',
  `des_idea` varchar(255) NOT NULL,
  `cal_final` decimal(10,2) DEFAULT NULL,
  `id_proponente` int NOT NULL,
  `create-time` timestamp NOT NULL,
  PRIMARY KEY (`id_idea`),
  KEY `id_proponente_idx` (`id_proponente`),
  CONSTRAINT `id_proponente` FOREIGN KEY (`id_proponente`) REFERENCES `proponentes` (`id_proponente`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideas`
--

LOCK TABLES `ideas` WRITE;
/*!40000 ALTER TABLE `ideas` DISABLE KEYS */;
INSERT INTO `ideas` VALUES (3,'Gomas de Colageno','No convocado','ss',0.00,28316532,'2024-12-02 13:58:48'),(4,'Extracto de café para uso cosmético obtenido a partir de la borra de café de especialidad','No convocado','Se trata de desarrollar un estracto de cafe',0.00,1111121444,'2024-12-04 19:16:57'),(5,'Helados dé aguacate cubiertos de chocolate','No convocado','Deliciosos helados de aguacate',0.00,131245451,'2024-12-09 17:24:23');
/*!40000 ALTER TABLE `ideas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proponentes`
--

DROP TABLE IF EXISTS `proponentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proponentes` (
  `id_proponente` int NOT NULL,
  `nombres_proponente` varchar(30) NOT NULL,
  `apellidos_proponente` varchar(45) NOT NULL,
  `correo_proponente` varchar(45) NOT NULL,
  `telefono_proponente` varchar(14) NOT NULL,
  `create_time` timestamp NOT NULL,
  PRIMARY KEY (`id_proponente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proponentes`
--

LOCK TABLES `proponentes` WRITE;
/*!40000 ALTER TABLE `proponentes` DISABLE KEYS */;
INSERT INTO `proponentes` VALUES (28316532,'Yazmin','Barragan','barraganramirezyazmin111@gmail.com','3102392251','2024-11-28 17:01:49'),(131245451,'Fanny','Castro Vargas','chocolate.laguneta@gmail.com','3228672019','2024-12-09 17:23:39'),(1107008520,'Juan David','Linares','juandavidlinares2005@gmail.com','3209455659','2024-11-28 16:43:33'),(1107009440,'Yahir Alberto','Linares','yahirlinares2018@gmail.com','3122554544','2024-11-28 17:13:55'),(1111121444,'Marlin Liseth ','Angulo Mantilla','marlinangulo2315@hotmail.com','3105727467','2024-12-02 13:43:54');
/*!40000 ALTER TABLE `proponentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubricas`
--

DROP TABLE IF EXISTS `rubricas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubricas` (
  `id_rubricas` int NOT NULL AUTO_INCREMENT,
  `des_rubricas` varchar(255) NOT NULL,
  `id_criterio` int DEFAULT NULL,
  `create_time` timestamp NOT NULL,
  PRIMARY KEY (`id_rubricas`),
  KEY `id_criterio_idx` (`id_criterio`),
  CONSTRAINT `id_criterio` FOREIGN KEY (`id_criterio`) REFERENCES `criterios` (`id_criterio`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubricas`
--

LOCK TABLES `rubricas` WRITE;
/*!40000 ALTER TABLE `rubricas` DISABLE KEYS */;
INSERT INTO `rubricas` VALUES (35,'(1-2)  No es clara, ni concisa ',58,'2024-12-04 15:20:43'),(36,'(3-4)  No es clara. ',58,'2024-12-04 15:27:18'),(37,'(5-7) Es suficientemente clara.',58,'2024-12-04 15:27:30'),(38,'(8-10) Es totalmente clara.',58,'2024-12-04 15:27:42'),(39,'(1-2) No presenta mínima información.',59,'2024-12-04 15:28:00'),(40,'(3-4) Presenta poca información.',59,'2024-12-04 15:28:16'),(41,'(5-7) Presenta suficiente información.',59,'2024-12-04 15:28:32'),(42,'(8-10) Presenta información completa.',59,'2024-12-04 15:28:44'),(43,'(1-2) Los objetivos enunciados No tienen relación con el problema, necesidad u oportunidad.',60,'2024-12-04 15:29:32'),(44,'(3-4) Los objetivos enunciados tienen poca relación con el problema, necesidad u oportunidad. ',60,'2024-12-04 15:29:44'),(45,'(5-7) Los objetivos enunciados tienen suficiente relación con el problema, necesidad u oportunidad. ',60,'2024-12-04 15:29:55'),(46,'(8-10) Los objetivos enunciados tienen completa relación con el problema, necesidad u oportunidad. ',60,'2024-12-04 15:30:28'),(47,'(1-2) Los resultados propuestos No corresponden con los objetivos.',61,'2024-12-04 15:31:23'),(48,'(3-4) Los resultados propuestos tienen poca correspondencia con los objetivos. ',61,'2024-12-04 15:31:35'),(49,'(5-7) Los resultados propuestos tienen suficiente correspondencia con los objetivos.',61,'2024-12-04 15:31:48'),(50,'(8-10) Los resultados propuestos tienen completa correspondencia con los objetivos.',61,'2024-12-04 15:31:59'),(51,'(1-2) El alcance de la propuesta No corresponde con los objetivos.',62,'2024-12-04 15:32:15'),(52,'(3-4) El alcance de la propuesta poco corresponde con los objetivos.',62,'2024-12-04 15:32:46'),(53,'(5-7) El alcance de la propuesta corresponde suficientemente con los objetivos.',62,'2024-12-04 15:32:59'),(54,'(8-10) El alcance de la propuesta corresponde completamente con los objetivos.',62,'2024-12-04 15:33:09'),(55,'(1-2) El proponente No tiene claridad conceptual, técnica y metodológica de cómo obtener los resultados.',63,'2024-12-04 15:33:35'),(56,'(3-4) El proponente tiene poca claridad conceptual, técnica y metodológica de cómo obtener los resultados. ',63,'2024-12-04 15:33:47'),(57,'(5-7) El proponente tiene suficiente claridad conceptual, técnica y metodológica de cómo obtener los resultados.',63,'2024-12-04 15:34:10'),(58,'(8-10) El proponente tiene completa claridad conceptual, técnica y metodológica de cómo obtener los resultados.',63,'2024-12-04 15:34:22'),(59,'(1-2) El resultado propuesto por la idea No presenta funcionalidades novedosas.',64,'2024-12-04 15:35:50'),(60,'(3-4) El resultado propuesto por la idea presenta pocas funcionalidades novedosas.',64,'2024-12-04 15:35:59'),(61,'(5-7) El resultado propuesto por la idea presenta suficientes funcionalidades novedosas.',64,'2024-12-04 15:36:09'),(62,'(8-10) El resultado propuesto por la idea presenta completas funcionalidades novedosas.',64,'2024-12-04 15:36:21'),(63,'(1-2) El resultado propuesto por la idea No tiene características que generan valor agregado.',65,'2024-12-04 15:36:44'),(64,'(3-4) El resultado propuesto por la idea tiene pocas características que generan valor agregado.',65,'2024-12-04 15:36:53'),(65,'(5-7) El resultado propuesto por la idea tiene suficientes características que generan valor agregado.',65,'2024-12-04 15:37:01'),(66,'(8-10) El resultado propuesto por la idea tiene plenas características que generan valor agregado.',65,'2024-12-04 15:37:17'),(67,'(1-2) El resultado propuesto No tiene identificados usuario(s), consumidor(es), cliente(s) y mercados potenciales.',66,'2024-12-04 15:37:45'),(68,'(3-4) El resultado propuesto tiene identificados pocos usuario(s), consumidor(es), cliente(s) y mercados potenciales. ',66,'2024-12-04 15:37:59'),(69,'(5-7) El resultado propuesto tiene identificados suficientes usuario(s), consumidor(es), cliente(s) y mercados potenciales.',66,'2024-12-04 15:38:11'),(70,'(8-10) El resultado propuesto tiene identificados un gran número de usuario(s), consumidor(es), cliente(s) y mercados potenciales.',66,'2024-12-04 15:38:37'),(71,'(1-2) No están definidos posibles canales de comercialización o de explotación del resultado propuestos.',67,'2024-12-04 15:38:57'),(72,'(3-4) Están definidos pocos posibles canales de comercialización o de explotación del resultado propuestos. ',67,'2024-12-04 15:39:06'),(73,'(5-7) Están definidos suficientes canales posibles de comercialización o de explotación del resultado propuestos.',67,'2024-12-04 15:39:15'),(74,'(8-10) Están definidos un gran número de posibles canales de comercialización o de explotación del resultado propuestos.',67,'2024-12-04 15:39:29');
/*!40000 ALTER TABLE `rubricas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `Id_User` int NOT NULL,
  `username` varchar(16) NOT NULL,
  `email` varchar(85) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` enum('Admin','Calificador') NOT NULL,
  `token` varchar(45) DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (28916532,'Yazmin Barragán','barraganRamirez1972@gmail.com','$2b$10$1zMHA/PzE34R1VtxmtfjlevVmuFToJX4Ea9PEfGfVW9e.mr3WFcre','Calificador','1icooqej022jqsbevur8','2024-11-15 20:37:19'),(55555555,'Carlos Jj','carlos@gmail.com','$2b$10$4JkBBCZwgUjJmyotjsoMB.wqcJda6o4MB.sUmmGrMnNi1ZMFm/8jK','Admin',NULL,'2024-12-02 17:01:21'),(110700850,'Juan Linares','juandavidlinares205@gmail.com','$2b$10$cotyfBlNKndM0MO37Lip3e9RmDAy4QZ9TKjf4Fphju0Em16SVJYlS','Admin',NULL,'2024-11-14 15:32:14'),(1107008520,'Juan Linares','juandavidlinares2005@gmail.com','$2b$10$e2EooVyC8OwYRascTJYAtOo3GThV2CSCgKkeQhEgAT.5LvMyBSdEa','Admin',NULL,'2024-11-14 15:28:24'),(1107008523,'Yahir Alberto','juan@gmail.com','$2b$10$GktElxHNw9gyqhB8sNHSz./9.jyvodcupgC18TXGd5lx4aKktrpMa','Calificador',NULL,'2024-12-02 20:13:00'),(1107009440,'Yahir Linares','yahirlinares2004@gmail.com','$2b$10$.PtKyoSLNQ67Z2jIOtgTqeQg2PRvfGn/vYAnuVmQU88KCp9drpdNq','Calificador',NULL,'2024-11-14 15:53:26');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-09 14:47:27
