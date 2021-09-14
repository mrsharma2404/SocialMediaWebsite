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
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `notification` (
  `notificationid` int(11) NOT NULL AUTO_INCREMENT,
  `imageid` int(11) DEFAULT NULL,
  `from_user_id` int(11) DEFAULT NULL,
  `to_user_id` int(11) DEFAULT NULL,
  `notification` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`notificationid`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (8,30,7,8,'Pankaj commented on your pic'),(9,30,7,8,'Pankaj commented on your pic'),(10,31,9,8,'Ashu commented on your pic'),(11,31,9,8,'Ashu commented on your pic'),(12,31,9,8,'Ashu commented on your pic'),(13,31,9,8,'Ashu commented on your pic'),(15,31,8,8,'Sudhanshu liked your pic '),(16,26,9,8,'Ashu liked your pic '),(17,28,7,8,'Pankaj liked your pic '),(18,28,7,8,'Pankaj commented on your pic'),(19,28,7,8,'Pankaj commented on your pic'),(20,31,7,8,'Pankaj commented on your pic'),(21,31,7,8,'Pankaj commented on your pic'),(22,0,1,9,'Rohit Sharma accepted your request '),(23,29,7,9,'Pankaj liked your pic '),(24,29,7,9,'Pankaj commented on your pic'),(25,24,7,9,'Pankaj liked your pic '),(26,24,7,9,'Pankaj commented on your pic'),(27,34,9,7,'Ashu liked your pic '),(28,34,9,7,'Ashu commented on your pic'),(29,33,9,7,'Ashu liked your pic '),(30,24,9,9,'Ashu liked your pic '),(31,34,7,7,'Pankaj liked your pic '),(32,34,1,7,'Rohit Sharma liked your pic '),(33,34,9,7,'Ashu liked your pic ');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 15:28:53
