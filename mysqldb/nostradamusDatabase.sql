CREATE DATABASE  IF NOT EXISTS `nostradamus` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `nostradamus`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: nostradamus
-- ------------------------------------------------------
-- Server version	8.0.16

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
-- Table structure for table `account_type`
--

DROP TABLE IF EXISTS `account_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account_type` (
  `accountTypeId` int(11) NOT NULL AUTO_INCREMENT,
  `accountTypeName` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`accountTypeId`),
  UNIQUE KEY `accountTypeId_UNIQUE` (`accountTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_type`
--

LOCK TABLES `account_type` WRITE;
/*!40000 ALTER TABLE `account_type` DISABLE KEYS */;
INSERT INTO `account_type` VALUES (1,'employee'),(2,'manager');
/*!40000 ALTER TABLE `account_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `branch` (
  `branchId` int(11) NOT NULL AUTO_INCREMENT,
  `branchName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`branchId`),
  UNIQUE KEY `branchId_UNIQUE` (`branchId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'Bergen op Zoom'),(2,'Halsteren'),(3,'Breda');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch_department`
--

DROP TABLE IF EXISTS `branch_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `branch_department` (
  `branchDepartmentId` int(11) NOT NULL AUTO_INCREMENT,
  `branchId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  PRIMARY KEY (`branchDepartmentId`),
  UNIQUE KEY `branchDepartmentId_UNIQUE` (`branchDepartmentId`),
  KEY `branch_department_branch_FK_idx` (`branchId`),
  KEY `branch_department_department_FK_idx` (`departmentId`),
  CONSTRAINT `branch_department_branch_FK` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `branch_department_department_FK` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch_department`
--

LOCK TABLES `branch_department` WRITE;
/*!40000 ALTER TABLE `branch_department` DISABLE KEYS */;
INSERT INTO `branch_department` VALUES (1,1,1),(2,1,3);
/*!40000 ALTER TABLE `branch_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `break_system`
--

DROP TABLE IF EXISTS `break_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `break_system` (
  `break_systemId` int(11) NOT NULL AUTO_INCREMENT,
  `userNumber` int(11) NOT NULL,
  `beginTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`break_systemId`),
  UNIQUE KEY `break_systemId_UNIQUE` (`break_systemId`),
  KEY `break_system_user_FK_idx` (`userNumber`),
  CONSTRAINT `break_system_user_FK` FOREIGN KEY (`userNumber`) REFERENCES `user` (`userNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `break_system`
--

LOCK TABLES `break_system` WRITE;
/*!40000 ALTER TABLE `break_system` DISABLE KEYS */;
INSERT INTO `break_system` VALUES (1,6215,'2019-05-26 17:52:59','2019-05-26 18:26:20'),(2,2,'2019-05-26 18:06:45','2019-05-26 18:26:52'),(3,2,'2019-05-26 18:07:20','2019-05-26 18:26:52'),(4,6215,'2019-05-26 18:19:17','2019-05-26 18:26:20'),(5,6215,'2019-05-26 18:20:44','2019-05-26 18:26:20'),(6,6215,'2019-05-26 18:26:07','2019-05-26 18:26:20'),(7,6215,'2019-05-26 18:26:11','2019-05-26 18:26:20'),(8,6215,'2019-05-26 18:26:11','2019-05-26 18:26:20'),(9,6215,'2019-05-26 18:29:17','2019-05-26 19:19:10'),(10,6215,'2019-05-26 18:29:30','2019-05-26 19:19:10'),(11,6215,'2019-05-26 18:29:32','2019-05-26 19:19:10'),(12,6215,'2019-05-26 18:29:33','2019-05-26 19:19:10'),(13,6215,'2019-05-26 19:10:32','2019-05-26 19:19:10'),(14,6215,'2019-05-26 19:10:38','2019-05-26 19:19:10'),(15,2,'2019-05-26 19:11:15','2019-05-26 19:19:22'),(16,2,'2019-05-26 19:13:05','2019-05-26 19:19:22'),(17,2,'2019-05-26 19:13:07','2019-05-26 19:19:22'),(18,2,'2019-05-26 19:20:01','2019-05-26 19:27:59'),(19,2,'2019-05-26 19:20:06','2019-05-26 19:27:59'),(20,2,'2019-05-26 19:20:08','2019-05-26 19:27:59'),(21,2,'2019-05-26 19:24:21','2019-05-26 19:27:59'),(22,2,'2019-05-26 19:24:22','2019-05-26 19:27:59'),(23,2,'2019-05-26 19:24:22','2019-05-26 19:27:59'),(24,2,'2019-05-26 19:24:23','2019-05-26 19:27:59'),(25,2,'2019-05-26 19:24:23','2019-05-26 19:27:59'),(26,2,'2019-05-26 19:24:23','2019-05-26 19:27:59'),(27,2,'2019-05-26 19:24:29','2019-05-26 19:27:59'),(28,2,'2019-05-26 19:24:31','2019-05-26 19:27:59'),(29,2,'2019-05-26 19:24:32','2019-05-26 19:27:59'),(30,2,'2019-05-26 19:25:39','2019-05-26 19:27:59'),(31,2,'2019-05-26 19:26:02','2019-05-26 19:27:59'),(32,2,'2019-05-26 19:26:36','2019-05-26 19:27:59'),(33,2,'2019-05-26 19:26:48','2019-05-26 19:27:59'),(34,2,'2019-05-26 19:28:17','2019-05-26 19:28:19'),(35,2,'2019-05-26 19:30:56','2019-05-26 19:30:57'),(36,6215,'2019-05-27 11:45:20','2019-05-27 11:45:23'),(37,6215,'2019-05-27 12:29:37','2019-05-27 12:29:51'),(38,6215,'2019-05-27 12:39:41','2019-05-27 12:39:45'),(39,6215,'2019-05-27 15:54:13','2019-05-27 15:56:05'),(40,6215,'2019-05-27 15:56:12','2019-05-27 15:57:49'),(41,6215,'2019-05-27 16:01:30','2019-05-27 16:01:45'),(42,6215,'2019-05-27 16:06:40','2019-05-27 16:06:41'),(43,6215,'2019-05-27 16:06:43','2019-05-27 16:06:45');
/*!40000 ALTER TABLE `break_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clocking_system`
--

DROP TABLE IF EXISTS `clocking_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clocking_system` (
  `clocingSystemId` int(11) NOT NULL AUTO_INCREMENT,
  `userNumber` int(11) NOT NULL,
  `beginTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `branchId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  PRIMARY KEY (`clocingSystemId`),
  UNIQUE KEY `clocingSystemId_UNIQUE` (`clocingSystemId`),
  KEY `clocking_system_userNumber_FK_idx` (`userNumber`),
  KEY `clocking_system_branch_FK_idx` (`branchId`),
  KEY `clocking_system_department_FK_idx` (`departmentId`),
  CONSTRAINT `clocking_system_branch_FK` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `clocking_system_department_FK` FOREIGN KEY (`departmentId`) REFERENCES `department` (`departmentId`),
  CONSTRAINT `clocking_system_user_FK` FOREIGN KEY (`userNumber`) REFERENCES `user` (`userNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clocking_system`
--

LOCK TABLES `clocking_system` WRITE;
/*!40000 ALTER TABLE `clocking_system` DISABLE KEYS */;
INSERT INTO `clocking_system` VALUES (3,6215,'2019-05-24 12:03:47','2019-05-24 12:15:18',1,1),(4,1,'2019-05-24 12:03:57','2019-05-24 12:15:01',1,1),(6,6215,'2019-05-24 15:15:33','2019-05-24 15:15:55',1,1),(7,6215,'2019-05-24 15:16:13','2019-05-24 15:16:16',1,1),(8,6215,'2019-05-24 15:16:45','2019-05-24 15:17:41',1,1),(9,2,'2019-05-24 15:17:24','2019-05-25 17:28:00',1,1),(10,6215,'2019-05-24 15:18:12','2019-05-24 15:18:13',1,1),(11,6215,'2019-05-24 15:18:55','2019-05-24 15:18:55',1,1),(12,6215,'2019-05-24 15:18:56','2019-05-24 15:18:57',1,1),(13,6215,'2019-05-24 15:28:45','2019-05-25 17:27:42',1,1),(14,2,'2019-05-25 17:28:27','2019-05-25 17:29:40',1,1),(15,2,'2019-05-25 17:29:41','2019-05-25 17:35:52',1,1),(16,6215,'2019-05-25 17:31:02','2019-05-25 17:33:15',1,1),(17,6215,'2019-05-25 17:33:18','2019-05-25 17:34:59',1,1),(18,6215,'2019-05-25 17:35:00','2019-05-25 17:35:01',1,1),(19,6215,'2019-05-25 17:35:02','2019-05-25 17:35:45',1,1),(20,6215,'2019-05-25 17:35:46','2019-05-25 17:35:48',1,1),(21,2,'2019-05-25 17:46:17','2019-05-25 17:46:18',1,1),(22,2,'2019-05-25 17:46:19','2019-05-25 17:46:20',1,1),(23,2,'2019-05-25 17:46:20','2019-05-25 17:46:21',1,1),(24,2,'2019-05-25 17:46:21','2019-05-25 17:46:22',1,1),(28,2,'2019-05-26 18:06:25','2019-05-26 18:15:57',1,1),(29,2,'2019-05-26 18:15:59','2019-05-26 18:20:42',1,1),(30,2,'2019-05-26 18:22:21','2019-05-26 18:22:36',1,1),(31,2,'2019-05-26 18:22:41','2019-05-26 18:22:42',1,1),(32,2,'2019-05-26 18:22:42','2019-05-26 18:24:42',1,1),(33,2,'2019-05-26 18:24:44','2019-05-26 19:11:24',1,1),(34,6215,'2019-05-26 18:25:10','2019-05-26 18:26:05',1,1),(35,6215,'2019-05-26 18:26:16','2019-05-26 18:28:19',1,1),(36,6215,'2019-05-26 18:28:21','2019-05-26 18:29:20',1,1),(37,6215,'2019-05-26 18:29:28','2019-05-26 19:31:29',1,1),(38,2,'2019-05-26 19:13:03','2019-05-26 19:13:09',1,1),(39,2,'2019-05-26 19:19:59','2019-05-26 19:24:27',1,1),(40,2,'2019-05-26 19:25:59','2019-05-26 19:28:08',1,1),(41,2,'2019-05-26 19:28:15','2019-05-26 19:28:22',1,1),(42,2,'2019-05-26 19:30:50','2019-05-26 19:30:59',1,1),(43,1256663,'2019-05-26 19:33:46','2019-05-27 09:43:05',1,1),(46,6215,'2019-05-27 09:33:02','2019-05-27 09:33:15',1,1),(49,6215,'2019-05-27 11:45:12','2019-05-27 11:45:27',1,1),(50,6215,'2019-05-27 12:29:17','2019-05-27 12:29:56',1,1),(51,6215,'2019-05-27 12:38:54','2019-05-27 12:38:59',1,1),(52,6215,'2019-05-27 12:39:36','2019-05-27 12:39:50',1,1),(53,6215,'2019-05-27 15:54:11','2019-05-27 15:56:09',1,1),(54,6215,'2019-05-27 15:56:10','2019-05-27 15:56:32',1,1),(55,6215,'2019-05-27 15:57:30','2019-05-27 15:57:30',1,1),(56,6215,'2019-05-27 15:57:49','2019-05-27 15:57:50',1,1),(57,6215,'2019-05-27 16:01:27','2019-05-27 16:01:45',1,1),(58,6215,'2019-05-27 16:06:36','2019-05-27 16:06:38',1,1),(59,6215,'2019-05-27 16:06:38','2019-05-27 16:06:45',1,1),(60,6215,'2019-05-27 16:08:30','2019-05-27 16:08:40',1,1),(61,6215,'2019-05-27 16:08:41','2019-05-27 16:08:42',1,1),(62,6215,'2019-05-27 16:08:42','2019-05-27 16:08:44',1,1);
/*!40000 ALTER TABLE `clocking_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company` (
  `companyId` int(10) NOT NULL AUTO_INCREMENT,
  `companyName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`companyId`),
  UNIQUE KEY `companyId_UNIQUE` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (1,'Albert Heijn'),(2,'Jumbo');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_branch`
--

DROP TABLE IF EXISTS `company_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `company_branch` (
  `companyBranchId` int(11) NOT NULL AUTO_INCREMENT,
  `companyId` int(11) NOT NULL,
  `branchId` int(11) NOT NULL,
  PRIMARY KEY (`companyBranchId`),
  UNIQUE KEY `companyBranchId_UNIQUE` (`companyBranchId`),
  KEY `company_branch_company_FK_idx` (`companyId`),
  KEY `company_branch_branch_FK_idx` (`branchId`),
  CONSTRAINT `company_branch_branch_FK` FOREIGN KEY (`branchId`) REFERENCES `branch` (`branchId`),
  CONSTRAINT `company_branch_company_FK` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_branch`
--

LOCK TABLES `company_branch` WRITE;
/*!40000 ALTER TABLE `company_branch` DISABLE KEYS */;
INSERT INTO `company_branch` VALUES (1,2,3),(2,1,2);
/*!40000 ALTER TABLE `company_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `department` (
  `departmentId` int(11) NOT NULL AUTO_INCREMENT,
  `departmentName` varchar(100) NOT NULL,
  PRIMARY KEY (`departmentId`),
  UNIQUE KEY `departmentId_UNIQUE` (`departmentId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'kassa'),(2,'vakkenvullers'),(3,'bakker');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `UserId` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `lastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `userName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `dateOfBirth` date NOT NULL,
  `emailAddress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accountType` int(11) NOT NULL,
  `userNumber` int(11) NOT NULL,
  PRIMARY KEY (`UserId`),
  UNIQUE KEY `UserId_UNIQUE` (`UserId`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  UNIQUE KEY `emailAddress_UNIQUE` (`emailAddress`),
  UNIQUE KEY `userNumber_UNIQUE` (`userNumber`),
  KEY `accountTypeId_FK_idx` (`accountType`),
  CONSTRAINT `accountTypeId_FK` FOREIGN KEY (`accountType`) REFERENCES `account_type` (`accountTypeId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Mick','Theuns','MTheuns','2001-08-21','mtheuns@outlook.com','testwachtwoord123',1,1),(2,'Tim','Ooijen','TOoijen','2001-10-23','tim.ooijen@gmail.com','wachtwoord123',1,2),(3,'Mick','Theuns','mtheuns20019','2001-08-21','mtheuns323@outlook.com','$2a$10$qWScnAzdpqAt5Kdn4vc2lOhYNl2MwuIgvL7BnpCavfAZfAY9n86Ca',1,6215),(9,'Mick','Theuns','mtheuns2001','2001-08-21','mtheuns@gmail.com','$2a$10$8A0xelzMKiq6htg2M7JmsOnLgDC2zI.NtVZZmBIQ62vBs8MTZfz.2',1,6),(10,'Rick','van Vliet','rvvliet2','1999-08-24','helloworld2@gmail.com','$2a$10$oJJgl8d8abtrgZbCNGNtzO9B4.bYxTpZmmEt/z013k4L.zDDtVLdq',1,1256662),(13,'Rick','van Vliet','rvvliet3','1999-08-24','helloworld3@gmail.com','$2a$10$SvKY2EZ.omMzJ16o7I83j.Z70HburzDvNg7EsxxxBPMv1/4Mu5CsG',1,1256663),(19,'Rick','van Vliet','rvvliet10','1999-08-24','helloworld10@gmail.com','$2a$10$2.mdsRBRgkSWCe6sVjxvputCitU9wzsFjahJC5ZhHAaO/0BYi.OJG',1,12566610);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_company`
--

DROP TABLE IF EXISTS `user_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user_company` (
  `userCompanyId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `companyId` int(11) NOT NULL,
  PRIMARY KEY (`userCompanyId`),
  UNIQUE KEY `userCompanyId_UNIQUE` (`userCompanyId`),
  KEY `user_company_company_FK_idx` (`companyId`),
  KEY `user_company_user_FK_idx` (`userId`),
  CONSTRAINT `user_company_company_FK` FOREIGN KEY (`companyId`) REFERENCES `company` (`companyId`),
  CONSTRAINT `user_company_user_FK` FOREIGN KEY (`userId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_company`
--

LOCK TABLES `user_company` WRITE;
/*!40000 ALTER TABLE `user_company` DISABLE KEYS */;
INSERT INTO `user_company` VALUES (1,1,1),(2,2,1);
/*!40000 ALTER TABLE `user_company` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-27 16:20:20
