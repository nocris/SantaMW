SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

CREATE TABLE `toys` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `description` varchar(50) NOT NULL,
    `price` double NOT NULL,
    `category` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `toys` (`name`, `description`, `price`,`category`) VALUES
('Playstation 4','Famous video game platform',499,0),
('Barbie','Pink doll',29,null),
("Monopoly",'Board game $$$',59,1),
("Foorball ball",'A ball to play outside',25,2),
("Chess",'Board game for smart children',25,1)

CREATE TABLE `categories` (
    `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `categories` (`name`) VALUES
('Videogames'),
('Boardgames'),
('Outdoor')