-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 17 2024 г., 18:08
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `poputnik`
--

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `places` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `trip_id` int DEFAULT NULL,
  `client_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `price`, `places`, `createdAt`, `updatedAt`, `trip_id`, `client_id`) VALUES
(29, '180.00', 1, '2024-01-17 12:19:52', '2024-01-17 12:19:52', NULL, 8),
(30, '600.00', 2, '2024-01-17 12:32:19', '2024-01-17 12:32:19', 7, 7);

-- --------------------------------------------------------

--
-- Структура таблицы `trips`
--

CREATE TABLE `trips` (
  `id` int NOT NULL,
  `from` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `to` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `date_arrival` date NOT NULL,
  `time_arrival` time NOT NULL,
  `car` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `max_places` int NOT NULL,
  `places_left` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `driver_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `trips`
--

INSERT INTO `trips` (`id`, `from`, `to`, `date_arrival`, `time_arrival`, `car`, `price`, `max_places`, `places_left`, `createdAt`, `updatedAt`, `driver_id`) VALUES
(6, 'Одеса', 'Київ', '2024-01-19', '15:00:00', 'Audi A4', '220.00', 5, 5, '2024-01-17 12:25:58', '2024-01-17 12:25:58', 1),
(7, 'Одеса', 'Київ', '2024-01-19', '10:00:00', 'BMW X5', '300.00', 6, 4, '2024-01-17 12:31:14', '2024-01-17 12:32:19', 3);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(75) COLLATE utf8mb4_general_ci NOT NULL,
  `age` int NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `role` enum('client','driver') COLLATE utf8mb4_general_ci DEFAULT 'client',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `age`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Костя', 'Лук\'яненко', 20, 'kirov1607@gmail.com', '$2b$10$uzEIpO.zic8gRJPZcE6a9.W2l0B4CybLJ5to9wtj1GUCM03qjplze', 'driver', '2024-01-14 11:12:28', '2024-01-14 11:12:28'),
(2, 'Петро', 'Петрович', 24, 'petrosyan@ukr.net', '$2b$10$a9djYbt9ctYgNOra3IL/yO8m8ySJdmarAm.nzutOy340Wzncvu.nm', 'client', '2024-01-15 15:51:50', '2024-01-15 15:51:50'),
(3, 'Петро', 'Петрович', 25, 'petrovich@urk.net', '$2b$10$slz2HX9pI0wAhwXv5TTmB.blqTIqOT/9AZ707J7CVgx85ZEAWtgsy', 'driver', '2024-01-17 10:28:53', '2024-01-17 10:28:53'),
(4, 'Ярік', 'Бочков', 25, 'yarik228@gmail.com', '$2b$10$iZVITg9LcTmfIB3H4qCA4ORq3FHdaZZCC1bJxV2EFNU/ksentID0O', 'client', '2024-01-17 10:50:58', '2024-01-17 10:50:58'),
(5, 'Тарас', 'Подзаборний', 45, 'Taras12345@gmail.com', '$2b$10$AfZy0oAfsclK4ZI0hFE4o.4N1wNzbx.pKdWleHQNLqNivQKn4aJtq', 'client', '2024-01-17 11:04:30', '2024-01-17 11:04:30'),
(6, 'Анна', 'Фесик', 21, 'fesikanna00@gmail.com', '$2b$10$MMkKQMCUPpIvtwFhYGwWeeyPwKljrSijjlWO1YFSAiEW9ebG7D4VG', 'client', '2024-01-17 11:04:32', '2024-01-17 11:04:32'),
(7, 'Львов', 'Львович', 25, 'lviv@gmail.com', '$2b$10$GqtEVkOcp6/kO5APVItc9./phGGq4hwbxF/gJ1XL3yQo1Sp9.fS4u', 'client', '2024-01-17 11:58:38', '2024-01-17 11:58:38'),
(8, 'Владислав', 'Слатвінський', 20, 'slatvikpro@gmail.com', '$2b$10$n/T5t5/ox0M5ETNS4gx9/uHv7/v8XGHq2M1KX6kKUkBklSUvndgZa', 'client', '2024-01-17 12:18:39', '2024-01-17 12:18:39');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trip_id` (`trip_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Индексы таблицы `trips`
--
ALTER TABLE `trips`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driver_id` (`driver_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT для таблицы `trips`
--
ALTER TABLE `trips`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`trip_id`) REFERENCES `trips` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `trips`
--
ALTER TABLE `trips`
  ADD CONSTRAINT `trips_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
