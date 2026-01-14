CREATE TABLE `roles`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(50) NOT NULL
);
ALTER TABLE
    `roles` ADD UNIQUE `roles_name_unique`(`name`);
CREATE TABLE `town_halls`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `province` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(10) NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP());
CREATE TABLE `users`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(100) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role_id` INT UNSIGNED NOT NULL,
    `points` INT NOT NULL,
    `photo_url` VARCHAR(255) NULL,
    `town_hall_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
ALTER TABLE
    `users` ADD INDEX `users_town_hall_id_index`(`town_hall_id`);
CREATE TABLE `nodes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `status` ENUM(
        'active',
        'inactive',
        'maintenance',
        'error'
    ) NOT NULL DEFAULT 'active',
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL
);
ALTER TABLE
    `nodes` ADD INDEX `nodes_user_id_index`(`user_id`);
ALTER TABLE
    `nodes` ADD INDEX `nodes_status_index`(`status`);
CREATE TABLE `measurements`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `node_id` INT UNSIGNED NOT NULL,
    `timestamp` DATETIME NOT NULL,
    `co2_value` FLOAT(53) NOT NULL COMMENT 'CO2 in ppm',
    `o3_value` FLOAT(53) NOT NULL COMMENT 'Ozone in \\0b5g/m\\0b3',
    `no2_value` FLOAT(53) NOT NULL COMMENT 'NO2 in \\0b5g/m\\0b3',
    `latitude` DECIMAL(10, 8) NOT NULL,
    `longitude` DECIMAL(11, 8) NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `measurements` ADD INDEX `measurements_latitude_longitude_index`(`latitude`, `longitude`);
ALTER TABLE
    `measurements` ADD INDEX `measurements_node_id_timestamp_index`(`node_id`, `timestamp`);
ALTER TABLE
    `measurements` ADD INDEX `measurements_timestamp_index`(`timestamp`);
CREATE TABLE `historic_air_quality`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `date` DATE NOT NULL
);
ALTER TABLE
    `historic_air_quality` ADD INDEX `historic_air_quality_date_index`(`date`);
CREATE TABLE `daily_stats`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `date` DATE NOT NULL,
    `active_hours` FLOAT(53) NOT NULL,
    `distance_km` FLOAT(53) NOT NULL,
    `points_earned` INT NOT NULL,
    `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(), `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `daily_stats` ADD UNIQUE `daily_stats_user_id_date_unique`(`user_id`, `date`);
ALTER TABLE
    `daily_stats` ADD INDEX `daily_stats_date_index`(`date`);
CREATE TABLE `prizes`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `points_required` INT NOT NULL,
    `quantity_available` INT NOT NULL,
    `initial_quantity` INT NOT NULL,
    `image_url` VARCHAR(255) NULL,
    `active` BOOLEAN NULL DEFAULT 'DEFAULT TRUE'
);
ALTER TABLE
    `prizes` ADD INDEX `prizes_points_required_index`(`points_required`);
ALTER TABLE
    `prizes` ADD INDEX `prizes_active_index`(`active`);
CREATE TABLE `winners`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `prize_id` INT UNSIGNED NOT NULL,
    `redemption_date` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP());
ALTER TABLE
    `winners` ADD INDEX `winners_user_id_index`(`user_id`);
ALTER TABLE
    `winners` ADD INDEX `winners_prize_id_index`(`prize_id`);
ALTER TABLE
    `winners` ADD INDEX `winners_redemption_date_index`(`redemption_date`);
CREATE TABLE `applications`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `dni` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(200) NOT NULL,
    `town_hall_id` INT UNSIGNED NOT NULL
);
ALTER TABLE
    `applications` ADD INDEX `applications_dni_index`(`dni`);
ALTER TABLE
    `applications` ADD INDEX `applications_town_hall_id_index`(`town_hall_id`);
CREATE TABLE `problems`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM(
        'open',
        'in_progress',
        'resolved',
        'closed'
    ) NULL DEFAULT 'open',
    `resolution` TEXT NULL
);
ALTER TABLE
    `problems` ADD INDEX `problems_user_id_index`(`user_id`);
ALTER TABLE
    `problems` ADD INDEX `problems_status_index`(`status`);
CREATE TABLE `downloads`(
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `file_name` VARCHAR(255) NOT NULL,
    `file` BLOB NULL
);
ALTER TABLE
    `problems` ADD CONSTRAINT `problems_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `daily_stats` ADD CONSTRAINT `daily_stats_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY(`role_id`) REFERENCES `roles`(`id`);
ALTER TABLE
    `measurements` ADD CONSTRAINT `measurements_node_id_foreign` FOREIGN KEY(`node_id`) REFERENCES `nodes`(`id`);
ALTER TABLE
    `winners` ADD CONSTRAINT `winners_prize_id_foreign` FOREIGN KEY(`prize_id`) REFERENCES `prizes`(`id`);
ALTER TABLE
    `winners` ADD CONSTRAINT `winners_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `applications` ADD CONSTRAINT `applications_town_hall_id_foreign` FOREIGN KEY(`town_hall_id`) REFERENCES `town_halls`(`id`);
ALTER TABLE
    `nodes` ADD CONSTRAINT `nodes_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_town_hall_id_foreign` FOREIGN KEY(`town_hall_id`) REFERENCES `town_halls`(`id`);