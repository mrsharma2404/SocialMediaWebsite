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
-- Table structure for table `signup`
--

DROP TABLE IF EXISTS `signup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `signup` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT '0',
  `gender` varchar(45) DEFAULT NULL,
  `dob` varchar(145) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `mobile` varchar(45) DEFAULT NULL,
  `password` varchar(145) DEFAULT NULL,
  `Bio` varchar(200) DEFAULT NULL,
  `profilepic` varchar(100) DEFAULT 'default.jpg',
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `signup`
--

LOCK TABLES `signup` WRITE;
/*!40000 ALTER TABLE `signup` DISABLE KEYS */;
INSERT INTO `signup` VALUES (1,'Rohit Sharma','male','2001-02-08T15:41:00.000Z','rohit@g.com','1234567890','11','this is your bio yes i m good','157664112_3797258463699466_7693039008321260662_n.jpg'),(7,'Pankaj','male','2001-01-01T15:41:54.000Z','pankaj@g.com','1234567890','11','This is my Bio ','food6.jpg'),(8,'Sudhanshu','male','2001-01-13T15:41:00.000Z','sudhanshu@g.com','7894561230','11','this is my bio i m sudhanshu arya','india.webp'),(9,'Ashu','male','2001-01-20T15:41:00.000Z','ashu@g.com','11','11','this is my bio i m ashu','ch.jpg'),(10,'Sidharth','male','2001-01-26T15:41:00.000Z','sid@g.com','7894566540','11','i m sid','men1.jpg'),(14,'Ritesh Gupta','male','null','ritesh@g.com','1234567890','11',NULL,'default.jpg'),(15,'Yash Tiwari','male','null','tiwari@g.com','1234567890','11',NULL,'default.jpg'),(16,'Ved Pathak','male','null','pathak@g.com','1234567890','11',NULL,'default.jpg'),(17,'Lavesh Advani','male','null','lavesh@g.com','1234567890','11',NULL,'default.jpg'),(18,'Pawan Patel','male','null','pawan@g.com','1234567890','11',NULL,'default.jpg'),(19,'Shreesh Trivedi','male','null','trivedi@g.com','1234567890','11',NULL,'default.jpg'),(20,'Shreyansh Mittal','male','null','mittal@g.com','1234567890','11',NULL,'default.jpg'),(21,'Somil Jain','male','null','somil@g.com','1234567890','11',NULL,'default.jpg');
/*!40000 ALTER TABLE `signup` ENABLE KEYS */;
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
