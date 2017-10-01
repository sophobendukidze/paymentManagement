-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2017 at 08:26 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `payment`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
`id` int(11) NOT NULL,
  `category` varchar(45) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'mobile services'),
(2, 'gasoline'),
(3, 'food'),
(4, 'charity'),
(5, 'transport');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE IF NOT EXISTS `payments` (
`id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `title`, `amount`, `category_id`, `date`, `comment`) VALUES
(1, 'mobile service payment', '50.00', 1, '2017-08-01 00:00:00', 'mobile service payment comment'),
(2, 'payment mobile service ', '10.00', 1, '2017-08-09 00:00:00', 'mobile service payment comment 1'),
(3, 'payment mobile service  123', '52.00', 1, '2017-08-25 00:00:00', 'mobile service payment comment 1'),
(4, 'payment charity', '200.00', 4, '2017-08-25 00:00:00', 'charity payment comment'),
(5, 'payment charity', '10.00', 4, '2017-08-16 00:00:00', 'charity payment comment'),
(6, 'payment charity 123', '10.00', 4, '2017-08-12 00:00:00', 'charity payment comment123'),
(7, 'payment gasoline', '50.00', 2, '2017-08-12 00:00:00', 'payment gasoline simple comment'),
(8, 'payment transport', '70.00', 5, '2017-08-12 00:00:00', 'payment transport simple comment'),
(9, 'payment transport', '70.00', 5, '2017-09-14 00:00:00', 'payment transport simple comment'),
(10, 'payment transport', '80.00', 5, '2017-09-14 00:00:00', 'payment transport simple comment'),
(11, 'payment transport 123', '35.00', 5, '2017-09-29 00:00:00', 'payment transport simple comment'),
(12, 'test payment mobile', '5.00', 1, '2017-07-18 00:00:00', 'test payment mobile service  comment'),
(13, 'test payment mobile', '15.00', 1, '2017-07-18 00:00:00', 'test payment mobile service  comment'),
(14, 'test payment transoprt', '15.00', 5, '2017-07-29 00:00:00', 'test payment transport comment'),
(15, 'gasoline payment in april 1', '80.00', 2, '2017-04-05 00:00:00', 'gasoline payment in april 1 comment'),
(16, 'gasoline payment in april 1', '256.00', 2, '2017-04-05 00:00:00', 'gasoline payment in april 1 comment'),
(17, 'gasoline payment in april 2', '256.00', 2, '2017-04-29 00:00:00', 'gasoline payment in april 2 comment'),
(18, 'test', '123.00', 3, '2017-10-21 00:00:00', 'adadasdad'),
(19, 'test', '123.00', 3, '2017-10-21 00:00:00', 'adadasdad'),
(20, 'test', '123.00', 3, '2017-10-21 00:00:00', 'adadasdad'),
(21, 'test', '123.00', 3, '2017-10-21 00:00:00', 'adadasdad'),
(22, 'new payment mobile service', '50.00', 1, '2017-10-26 00:00:00', 'test new payment comment');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
