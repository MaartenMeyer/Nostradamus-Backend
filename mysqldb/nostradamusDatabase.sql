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
INSERT INTO `account_type` VALUES (1,'admin'),(2,'manager'),(3,'employee');
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
INSERT INTO `branch` VALUES (1,'Miggelenberg'),(2,'Heideheuvel'),(3,'Heihaas'),(4,'Port Greve'),(5,'Waterparc Veluwemeer');
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
INSERT INTO `branch_department` VALUES 
(1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),
(10,2,1),(11,2,2),(12,2,3),(13,2,5),(14,2,7),(15,2,9),
(16,3,1),(17,3,2),(18,3,5),(19,3,6),(20,3,8),(21,3,9),
(22,4,1),(23,4,2),(24,4,3),(25,5,4),(26,5,8),
(27,5,1),(28,5,2),(29,5,3),(30,5,4),(40,5,6),(41,5,8);
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
INSERT INTO `break_system` VALUES (1,1,'2019-05-26 17:52:59','2019-05-26 18:26:20');
/*!40000 ALTER TABLE `break_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clocking_system`
--

DROP TABLE IF EXISTS `clocking_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `clocking_system` (
  `clockingSystemId` int(11) NOT NULL AUTO_INCREMENT,
  `userNumber` int(11) NOT NULL,
  `beginTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `branchId` int(11) NOT NULL,
  `departmentId` int(11) NOT NULL,
  PRIMARY KEY (`clockingSystemId`),
  UNIQUE KEY `clockingSystemId_UNIQUE` (`clockingSystemId`),
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
INSERT INTO `clocking_system` VALUES (1,1,'2019-05-26 18:06:25','2019-05-26 18:15:57',1,1);
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
INSERT INTO `company` VALUES (1,'Landal GreenParks');
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
INSERT INTO `company_branch` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5);
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
INSERT INTO `department` VALUES (1,'Schoonmaak'),(2,'Receptie'),(3,'Restaurant'),(4,'Entertainment'),(5,'Snackbar'),(6,'Verhuur'),(7,'Hoveniersdienst'),(8,'Zwembad'),(9,'Winkel');
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
INSERT INTO `user` VALUES 
(1,'Ad','Admin','admin','2019-01-01','ad@admin.com','$2a$10$9go39XbmThH9W91ohvxnZeT0k3Mz4H.6KH0W/VmtEzuKSasrA1XRG',1,1),
(2,'Max','Manager','manager','2019-01-02','max@manager.com','$2a$10$Qmu6Bt6c0e2ZOovFmMgA5.7V0QMxdGW30KSsWQIDsfL73IPty8Pqe',2,2),
(3,'Els','Employee','employee','2019-01-03','els@employee.com','$2a$10$3dBnen4VSSgUI6hgem29luRoNfBhcyaV91gKlvy.v2EoBnUrDkc0i',3,3);
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
INSERT INTO `user_company` VALUES (1,1,1),(2,2,1),(3,3,1);
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
