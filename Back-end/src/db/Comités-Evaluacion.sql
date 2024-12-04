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
-- Table structure for table `comités-evaluación`
--

DROP TABLE IF EXISTS `comités-evaluación`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comités-evaluación` (
  `id_comités_evaluación` int NOT NULL AUTO_INCREMENT,
  `fec_comité_evaluación` date NOT NULL,
  `id_idea` int NOT NULL,
  `id_conjunto_criterio` int NOT NULL,
  `Id_User` int NOT NULL,
  `create_time` timestamp NOT NULL,
  PRIMARY KEY (`id_comités_evaluación`),
  KEY `id_idea_idx` (`id_idea`) /*!80000 INVISIBLE */,
  KEY `id_conjunto_criterio_idx` (`id_conjunto_criterio`),
  KEY `Id_User_idx` (`Id_User`),
  CONSTRAINT `fk_id_conjunto_criterio` FOREIGN KEY (`id_conjunto_criterio`) REFERENCES `conjunto_criterios` (`id_conjunto_criterio`),
  CONSTRAINT `fk_id_idea` FOREIGN KEY (`id_idea`) REFERENCES `ideas` (`id_idea`),
  CONSTRAINT `Id_User` FOREIGN KEY (`Id_User`) REFERENCES `user` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comités-evaluación`
--

LOCK TABLES `comités-evaluación` WRITE;
/*!40000 ALTER TABLE `comités-evaluación` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conjunto_criterios`
--

LOCK TABLES `conjunto_criterios` WRITE;
/*!40000 ALTER TABLE `conjunto_criterios` DISABLE KEYS */;
INSERT INTO `conjunto_criterios` VALUES (32,'FORMULACIÓN DE LA IDEA','2024-11-28 15:51:02'),(39,'VIABILIDAD DE LA IDEA EN EL MERCADO','2024-11-28 18:37:56'),(40,'CAPACIDAD DE ACOMPAÑAMIENTO DEL TECNOPARQUE\n','2024-11-28 18:38:17'),(41,'CAPACIDAD DE EJECUCIÓN DEL PROPONENTE O  POSIBLE TALENTO','2024-11-28 18:38:27');
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `criterios`
--

LOCK TABLES `criterios` WRITE;
/*!40000 ALTER TABLE `criterios` DISABLE KEYS */;
INSERT INTO `criterios` VALUES (42,'Descripción clara y concisa del problema, necesidad u oportunidad a atender con la idea.',32,'2024-11-28 16:32:46'),(43,'Suficiente conocimiento sobre otros resultados que dan solución al problema, necesidad u oportunidad.',32,'2024-11-28 16:34:34'),(44,'Los objetivos de la idea contribuyen a la solución del problema, necesidad u oportunidad.',32,'2024-11-28 16:42:03'),(45,'Los resultados propuestos corresponden a los objetivos.',32,'2024-11-28 16:42:16'),(46,'El alcance de la propuesta esta corresponde con los objetivos.',32,'2024-11-28 17:10:58');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ideas`
--

LOCK TABLES `ideas` WRITE;
/*!40000 ALTER TABLE `ideas` DISABLE KEYS */;
INSERT INTO `ideas` VALUES (3,'Gomas de Colageno','No convocado','ss',0.00,28316532,'2024-12-02 13:58:48');
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
INSERT INTO `proponentes` VALUES (28316532,'Yazmin','Barragan','barraganramirezyazmin111@gmail.com','3102392251','2024-11-28 17:01:49'),(1107008520,'Juan David','Linares','juandavidlinares2005@gmail.com','3209455659','2024-11-28 16:43:33'),(1107009440,'Yahir Alberto','Linares','yahirlinares2018@gmail.com','3122554544','2024-11-28 17:13:55'),(1111121444,'Marlin Liseth ','Angulo Mantilla','marlinangulo2315@hotmail.com','3105727467','2024-12-02 13:43:54');
/*!40000 ALTER TABLE `proponentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubricas`
--

DROP TABLE IF EXISTS `rubricas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubricas` (
  `id_rubricas` int NOT NULL,
  `des_rubricas` varchar(255) NOT NULL,
  `id_criterio` int DEFAULT NULL,
  PRIMARY KEY (`id_rubricas`),
  KEY `id_criterio_idx` (`id_criterio`),
  CONSTRAINT `id_criterio` FOREIGN KEY (`id_criterio`) REFERENCES `criterios` (`id_criterio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubricas`
--

LOCK TABLES `rubricas` WRITE;
/*!40000 ALTER TABLE `rubricas` DISABLE KEYS */;
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

-- Dump completed on 2024-12-03 10:01:19
