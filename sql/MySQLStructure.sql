CREATE DATABASE  IF NOT EXISTS `tetris` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tetris`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tetris
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `GameID` int NOT NULL AUTO_INCREMENT,
  `WinnerID` int NOT NULL,
  `StartDate` int unsigned NOT NULL DEFAULT '0',
  `EndDate` int unsigned NOT NULL DEFAULT '0',
  `Gametype` varchar(45) NOT NULL,
  `PauseTime` int unsigned DEFAULT NULL,
  PRIMARY KEY (`GameID`),
  KEY `WinnerID_idx` (`WinnerID`),
  CONSTRAINT `WinnerID` FOREIGN KEY (`WinnerID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5925 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification` (
  `NotifID` int NOT NULL AUTO_INCREMENT,
  `PostedBy` int NOT NULL,
  `Text` varchar(500) DEFAULT NULL,
  `PostTime` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`NotifID`),
  UNIQUE KEY `NotifID_UNIQUE` (`NotifID`),
  UNIQUE KEY `PostTime_UNIQUE` (`PostTime`),
  KEY `PostedBy_idx` (`PostedBy`),
  CONSTRAINT `PostedBy` FOREIGN KEY (`PostedBy`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `score`
--

DROP TABLE IF EXISTS `score`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `score` (
  `ScoreID` int NOT NULL,
  `userID` int NOT NULL,
  `Date` int unsigned DEFAULT NULL,
  `Score` int unsigned DEFAULT NULL,
  PRIMARY KEY (`ScoreID`),
  KEY `useridd_idx` (`userID`),
  CONSTRAINT `score_uid` FOREIGN KEY (`userID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `SessionID` int NOT NULL AUTO_INCREMENT,
  `SessionUser` int NOT NULL,
  `StartDate` int NOT NULL,
  `TerminationDate` int DEFAULT NULL,
  `PHPID` varchar(45) NOT NULL,
  `Activity` int NOT NULL,
  PRIMARY KEY (`SessionID`),
  UNIQUE KEY `PHPId_UNIQUE` (`PHPID`),
  UNIQUE KEY `SessionID_UNIQUE` (`SessionID`),
  KEY `SessionUser_idx` (`SessionUser`),
  CONSTRAINT `SessionUser` FOREIGN KEY (`SessionUser`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=2910 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `UserID` int NOT NULL,
  `Username` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `PasswordHash` varchar(64) NOT NULL,
  `RegisteredDate` int unsigned DEFAULT NULL,
  `LastActive` int unsigned DEFAULT NULL,
  `NotifDate` int unsigned DEFAULT NULL,
  `ColZ` varchar(7) DEFAULT '#DD2244',
  `ColL` varchar(7) DEFAULT '#DD7733',
  `ColO` varchar(7) DEFAULT '#EEDD33',
  `ColS` varchar(7) DEFAULT '#22DD44',
  `ColI` varchar(7) DEFAULT '#22CCDD',
  `ColJ` varchar(7) DEFAULT '#2244DD',
  `ColT` varchar(7) DEFAULT '#CC22DD',
  `DAS` int unsigned DEFAULT '100',
  `ARR` int unsigned DEFAULT '50',
  `Drop` int unsigned DEFAULT '50',
  `leftKey` varchar(45) DEFAULT 'ArrowLeft',
  `rightKey` varchar(45) DEFAULT 'ArrowRight',
  `rotateKey` varchar(45) DEFAULT 'ArrowUp',
  `rotateccwKey` varchar(45) DEFAULT 'Control',
  `fasterKey` varchar(45) DEFAULT 'ArrowDown',
  `quickKey` varchar(45) DEFAULT 'Enter',
  `storeKey` varchar(45) DEFAULT 'Space',
  `admin` tinyint DEFAULT '0',
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `whoplayed`
--

DROP TABLE IF EXISTS `whoplayed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `whoplayed` (
  `GameID` int NOT NULL,
  `UserID` int NOT NULL,
  `points` int unsigned DEFAULT NULL,
  `rowCount` int unsigned DEFAULT NULL,
  PRIMARY KEY (`GameID`,`UserID`),
  KEY `UserID_idx` (`UserID`),
  CONSTRAINT `GameID` FOREIGN KEY (`GameID`) REFERENCES `game` (`GameID`),
  CONSTRAINT `UserID` FOREIGN KEY (`UserID`) REFERENCES `user` (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-01  3:42:21
