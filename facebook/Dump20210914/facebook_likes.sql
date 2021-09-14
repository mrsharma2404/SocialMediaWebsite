-- MySQL dump 10.13  Distrib 8.0.11, for Win64 (x86_64)
--
-- Host: localhost    Database: facebook
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `likes` (
  `imageid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `chk` varchar(45) NOT NULL,
  PRIMARY KEY (`chk`),
  UNIQUE KEY `chk_UNIQUE` (`chk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (19,1,'1,19'),(20,1,'1,20'),(34,1,'1,34'),(1,9,'1,9'),(12,10,'10,12'),(19,10,'10,19'),(2,9,'2,9'),(3,9,'3,9'),(14,7,'7,14'),(19,7,'7,19'),(24,7,'7,24'),(28,7,'7,28'),(29,7,'7,29'),(30,7,'7,30'),(31,7,'7,31'),(34,7,'7,34'),(11,8,'8,11'),(12,8,'8,12'),(13,8,'8,13'),(14,8,'8,14'),(19,8,'8,19'),(20,8,'8,20'),(24,8,'8,24'),(26,8,'8,26'),(27,8,'8,27'),(28,8,'8,28'),(31,8,'8,31'),(12,9,'9,12'),(13,9,'9,13'),(14,9,'9,14'),(15,9,'9,15'),(16,9,'9,16'),(18,9,'9,18'),(19,9,'9,19'),(20,9,'9,20'),(23,9,'9,23'),(26,9,'9,26'),(27,9,'9,27'),(28,9,'9,28'),(29,9,'9,29'),(31,9,'9,31'),(33,9,'9,33'),(34,9,'9,34');
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 15:28:52
