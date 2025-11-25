CREATE TABLE `stickers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`positionX` int NOT NULL DEFAULT 0,
	`positionY` int NOT NULL DEFAULT 0,
	`zIndex` int NOT NULL DEFAULT 1,
	`color` varchar(20) NOT NULL DEFAULT 'yellow',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stickers_id` PRIMARY KEY(`id`)
);
