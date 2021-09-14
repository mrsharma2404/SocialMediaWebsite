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
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `comment` (
  `commentid` int(11) NOT NULL AUTO_INCREMENT,
  `imageid` int(11) NOT NULL,
  `comment` varchar(45) DEFAULT NULL,
  `userid` int(11) NOT NULL,
  `chk` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`commentid`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,11,'ca?c,l;a,;lca',9,NULL),(2,11,'abcd',9,NULL),(3,12,'this is my second comment',9,NULL),(4,12,'this is my third comment',9,NULL),(5,12,'hello',9,NULL),(6,19,'this is my oic',9,NULL),(7,19,'this is my pic second comment',9,NULL),(8,29,'hello',9,NULL),(9,29,'hii',9,NULL),(10,29,'3 rd comment',9,NULL),(11,29,'4th comment',9,NULL),(12,29,'5th comment',9,NULL),(13,29,'6th comment',9,NULL),(14,30,'this is me pankaj',7,NULL),(15,30,'this is again pankaj',7,NULL),(16,30,'this is pankaj',7,NULL),(17,30,'this is pankaj4',7,NULL),(18,30,'it\'s okay pankaj5 check',7,NULL),(19,30,'abcd',7,NULL),(20,30,'check6 from pankaj',7,NULL),(21,30,'chekc6 pankaj',7,NULL),(22,30,'check7 pankaj',7,NULL),(23,31,'it\'s me',9,NULL),(24,31,'i mean ashu',9,NULL),(25,31,'3rd comment check ashu',9,NULL),(26,31,'check4 ashu',9,NULL),(27,26,'its me sudhanshu',8,NULL),(28,26,'its me sudhanshu check2',8,NULL),(29,28,'hello check 1646hours',7,NULL),(30,28,'hello check 1647hours',7,NULL),(31,31,'comment check 1648hours',7,NULL),(32,31,'comment check 1648hours',7,NULL),(33,19,'i am ahsu ',9,NULL),(34,29,'pankaj',7,NULL),(35,24,'hello',7,NULL),(36,34,'you got 2 notification now',9,NULL);
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 15:28:50
