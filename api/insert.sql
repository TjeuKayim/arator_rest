

-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: studmysql01.fhict.local
-- Generation Time: Dec 10, 2019 at 11:18 AM
-- Server version: 5.7.26-log
-- PHP Version: 5.6.40

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbi380599`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(25) NOT NULL,
  `username` varchar(100),
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` text,
  `sex` text,
  `dob` date,
  `age_group` varchar(25),
  `mobile_number` varchar(25),
  `language` text,
  `user_type` text,
  `profile_picture` longblob,
  `ratings` int(11) DEFAULT NULL,
  CONSTRAINT email_unique UNIQUE (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

DROP TABLE IF EXISTS `produces`;
CREATE TABLE `produces` (
  id int(25),
  name varchar(100) NOT NULL,
  imagePath varchar(100),
  type varchar(100),
  description varchar(1000),
  priceInDollar int(25),
  weightUnit varchar(20),
  PRIMARY KEY (id)
) ENGINE=INNODB;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  id int(25),
  buyer_id varchar(100) NOT NULL,
  seller_id varchar(50) NOT NULL,
  PRIMARY KEY(id)
) ENGINE=INNODB;

DROP TABLE IF EXISTS `produces_orders`;
CREATE TABLE `produces_orders` (
  produce_id int(25),
  order_id int(25),
  PRIMARY KEY(produce_id, order_id)
) ENGINE=INNODB;

ALTER TABLE `produces`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

ALTER TABLE `orders`
  MODIFY `id` int(25) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

INSERT INTO produces(name, imagePath, type, description, priceInDollar, weightUnit) VALUES(
  "Jonagold",
  "apples.png",
  "Apples",
  "Jonagold is a cultivar of apple which was developed in 1953 in New York State Agricultural Experiment Station of Cornell University's College of Agriculture and Life Sciences, a cross between the crisp Golden Delicious and the blush-crimson Jonathan.",
  2.0,
  "kg"
),
(
  "Conference",
  "pears.png",
  "Pears",
  "It is an autumn cultivar (cultivated variety) of the European pear (Pyrus communis). This variety of pear was developed in Britain by Thomas Francis Rivers. It owes its name to the fact that it won first prize at the National British Pear Conference in London in 1885.",
  1.6,
  "kg"
),
(
  "Jumbo",
  "strawberry.png",
  "Strawberries",
  "The garden strawberry is a widely grown hybrid species of the genus Fragaria, collectively known as the strawberries, which are cultivated worldwide for their fruit. The fruit is widely appreciated for its characteristic aroma, bright red color, juicy texture, and sweetness.",
  3.7,
  "kg"
),
(
  "Nadampazham",
  "banana.png",
  "Bananas",
  "A banana is an edible fruit, produced by several kinds of large herbaceous flowering plants in the genus Musa. In some countries, bananas used for cooking may be called plantains, distinguishing them from dessert bananas.",
  1.3,
  "kg"
);