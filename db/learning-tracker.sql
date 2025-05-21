-- Drop and create database
DROP DATABASE IF EXISTS `learning-tracker`;
CREATE DATABASE `learning-tracker`;
USE `learning-tracker`;

-- Create tables
CREATE TABLE `users` (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT NOW(),
  `updated_at` TIMESTAMP DEFAULT NOW() ON UPDATE NOW()
);

CREATE TABLE `categories` (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL
);

CREATE TABLE `skills` (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `category_id` INT REFERENCES `categories`(`id`)
);

CREATE TABLE `resources` (
  `id` SERIAL PRIMARY KEY,
  `skill_id` INT REFERENCES `skills`(`id`) ON DELETE CASCADE,
  `title` VARCHAR(255) NOT NULL,
  `url` TEXT,
  `format` VARCHAR(50),
  `difficulty` VARCHAR(50),
  `created_at` TIMESTAMP DEFAULT NOW()
);

CREATE TABLE `goals` (
  `id` SERIAL PRIMARY KEY,
  `user_id` INT REFERENCES `users`(`id`) ON DELETE CASCADE,
  `skill_id` INT REFERENCES `skills`(`id`) ON DELETE CASCADE,
  `target_date` DATE,
  `note` TEXT,
  `created_at` TIMESTAMP DEFAULT NOW(),
  `status` VARCHAR(50) DEFAULT 'in_progress'
);

-- Insert initial data
INSERT INTO `users` (`name`, `email`, `password`) VALUES
  ('Robell Asfaw', 'robell@example.com', 'hashed_password_123');

INSERT INTO `categories` (`name`) VALUES
  ('Programming'),
  ('DevOps'),
  ('Cloud'),
  ('Soft Skills'),
  ('Data');

INSERT INTO `skills` (`name`, `category_id`) VALUES
  ('JavaScript', 1),
  ('Python', 1),
  ('Docker', 2),
  ('Kubernetes', 2),
  ('AWS', 3),
  ('Azure', 3),
  ('Communication', 4),
  ('Time Management', 4),
  ('SQL', 5),
  ('Data Visualization', 5);

INSERT INTO `resources` (`skill_id`, `title`, `url`, `format`, `difficulty`) VALUES
  (1, 'JavaScript for Beginners', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'article', 'beginner'),
  (3, 'Docker Getting Started', 'https://docs.docker.com/get-started/', 'course', 'beginner'),
  (5, 'AWS Free Training', 'https://aws.amazon.com/training/', 'video', 'intermediate');

INSERT INTO `goals` (`user_id`, `skill_id`, `target_date`, `note`, `status`) VALUES
  (1, 2, '2025-06-15', 'Complete Python basics before job interviews', 'in_progress'),
  (1, 5, '2025-07-01', 'Deploy a basic app on AWS', 'not_started');
