-- Drop and create database
DROP DATABASE IF EXISTS `learning-tracker`;
CREATE DATABASE `learning-tracker`;
USE `learning-tracker`;

-- Create tables
CREATE TABLE `users` (
  `id` SERIAL PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` TEXT NOT NULL,
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
  ('Robell Asfaw', 'robell@example.com', 'ee3ab45438c62955328e3bd685a4fc52d0bfc08d2926b022774c434bf2f51933dd738f1650a09fde01565a5deec8d9f4a529790fc1504b03bb4e6347a0ba2916bd5b89b25e5e62829e18af545b6da1bc9db56c1ceffa320d8d56ad00f258b3f6cb33a56c104c5663cab484f4bd1237fecfb76b08bd91bffe1a3179069bd4e3c09d1eb1db664eb7d692a11eed3335c50b15e6530f31cbd748fdabcb49401705a6e86160389f111c3ac89baf2e486337bfd35b5797a5d0c9049bd99969a138d6b7c6a2c713346f4012e037c10852ef01bc83d602bde58019794c0d1a558140184ab2b9382e024de22ef9a84c4d12c301747b5e45b2d204e5582ca7f4bfaa4140dc');

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
