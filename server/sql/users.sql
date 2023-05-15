CREATE TABLE IF NOT EXISTS `become_rich`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR (75) NOT NULL,
  `password` VARCHAR (255) NOT NULL,
  `username` VARCHAR (50) NOT NULL,
  `gender` ENUM('male', 'female', 'other'),
  `options` TEXT NOT NULL,
  `email_verified` TINYINT NOT NULL DEFAULT 0,
  `role_as` VARCHAR (10) NOT NULL DEFAULT 'user',
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `opdated_at` DATETIME on update CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE `INDEX_EMAIL` (`email`)
) ENGINE = InnoDB;