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
-- Table structure for table `newimages`
--

DROP TABLE IF EXISTS `newimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `newimages` (
  `imageid` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `newimage` varchar(145) DEFAULT '0',
  `date` varchar(145) DEFAULT '0',
  `caption` varchar(445) DEFAULT NULL,
  PRIMARY KEY (`imageid`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newimages`
--

LOCK TABLES `newimages` WRITE;
/*!40000 ALTER TABLE `newimages` DISABLE KEYS */;
INSERT INTO `newimages` VALUES (0,0,'handshake.jpg','1-1-2021',NULL),(7,1,'india.webp','1-1-2021',NULL),(8,1,'foo3.jpg','01-01-2021','this is my first status'),(10,1,'food5.jpg','01-01-2021','this is my third status'),(11,7,'food4.jpg','1-1-2021',NULL),(12,7,'foo3.jpg','1-1-2021',NULL),(13,7,'food2.jpeg','1-1-2021',NULL),(15,8,'ch1.jpg','1-1-2021','i m sudhanshu 2'),(16,8,'ch3.jpg','1-1-2021','i m sushanshu 3'),(18,10,'ch2.jpg','1-1-2021',NULL),(19,9,'wo.jpg','1-1-2021',NULL),(20,7,'ch2.jpg','1-1-2021',NULL),(23,9,'the-witcher-henry-cavill-netflix-l2.jpg','1-1-2021',NULL),(24,9,'guardians-of-the-galaxy-milano-wallpaper.jpg','01-01-2021','abcd'),(26,8,'the-witcher-netflix-netflix-tv-series-henry-cavill-geralt-of-rivia-hd-wallpaper-preview.jpg','01-01-2021','hey its me again today is 26-07 and 1807 hours'),(27,8,'The-Witcher-Netflix-10.jpg','Mon Jul 26 2021 18:14:25 GMT+0530 (India Standard Time)','hey its again me today is 26-07 and 1814 hours '),(28,8,'wallpapersden.com_witcher-netflix_2560x1440.jpg','Mon Jul 26 2021 18:16:24 GMT+0530 (India Standard Time)','hey its again me today is 26-07 and 1817 hours'),(31,8,'the-witcher-henry-cavill-netflix-l2.jpg','Mon Jul 26 2021 22:06:25 GMT+0530 (India Standard Time)','image check 1 , 26-07, 2206hours '),(33,7,'0','2021-07-30T18:20:02.946Z','hello pankaj checking status 1'),(34,7,'handshake.jpg','Fri Jul 30 2021 23:50:33 GMT+0530 (India Standard Time)','hello pankaj is checking status 2');
/*!40000 ALTER TABLE `newimages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 15:28:51
