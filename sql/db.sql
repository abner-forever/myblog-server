/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 8.0.16 : Database - youpin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`youpin` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `youpin`;

/*Table structure for table `article` */

DROP TABLE IF EXISTS `article`;

CREATE TABLE `article` (
  `articleId` int(16) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `userId` int(32) NOT NULL,
  `createTime` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updateTime` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `contents` longtext COLLATE utf8_unicode_ci,
  KEY `id` (`articleId`),
  KEY `userId` (`userId`),
  CONSTRAINT `article_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=100031 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `article` */

insert  into `article`(`articleId`,`title`,`userId`,`createTime`,`updateTime`,`contents`) values (100017,'1',126,'2019-09-29 15:51:21',NULL,'内容2222222222222222333333333333333333333333333333'),(100019,'2',126,'2019-09-29 16:37:41',NULL,'内容该改啊改改改啊个'),(100022,'3',123,'2019-09-29 16:47:00',NULL,'内容该改啊改改改啊个'),(100023,'4',123,'2019-09-29 17:20:22',NULL,'内容该改啊改Q改啊个1'),(100024,'5',123,'2019-09-29 17:20:24',NULL,'内容该改啊改Q改啊个12'),(100025,'6',123,'2019-09-29 17:20:28',NULL,'内容该改啊改Q改啊个12'),(100026,'7',123,'2019-09-29 17:20:30',NULL,'内容该改啊改Q改啊个12'),(100027,'8',123,'2019-09-29 17:20:32',NULL,'内容该改啊改Q改啊个12'),(100028,'9',123,'2019-09-29 17:20:35',NULL,'内容该改啊改Q改啊个12'),(100029,'10',123,'2019-09-29 17:20:39',NULL,'内容该改啊改Q改啊个12'),(100030,'11',123,'2019-09-29 17:20:42',NULL,'内容该改啊改Q改啊个12');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `userId` int(32) NOT NULL AUTO_INCREMENT,
  `userName` char(32) CHARACTER SET utf8 NOT NULL,
  `sex` int(2) NOT NULL DEFAULT '1',
  `phone` char(16) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`userId`,`userName`,`sex`,`phone`) values (123,'Abner',1,'123123123123'),(124,'Forever',2,'199201881111'),(125,'ybq',2,'10909211838'),(126,'张三',1,'19920181234');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
