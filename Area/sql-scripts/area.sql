-- phpMyAdmin SQL Dump
-- version 5.2.1-1.fc38
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 05 nov. 2023 à 14:41
-- Version du serveur : 8.0.34
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `area`
--

-- --------------------------------------------------------

--
-- Structure de la table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add user', 4, 'add_user'),
(14, 'Can change user', 4, 'change_user'),
(15, 'Can delete user', 4, 'delete_user'),
(16, 'Can view user', 4, 'view_user'),
(17, 'Can add content type', 5, 'add_contenttype'),
(18, 'Can change content type', 5, 'change_contenttype'),
(19, 'Can delete content type', 5, 'delete_contenttype'),
(20, 'Can view content type', 5, 'view_contenttype'),
(21, 'Can add session', 6, 'add_session'),
(22, 'Can change session', 6, 'change_session'),
(23, 'Can delete session', 6, 'delete_session'),
(24, 'Can view session', 6, 'view_session'),
(25, 'Can add site', 7, 'add_site'),
(26, 'Can change site', 7, 'change_site'),
(27, 'Can delete site', 7, 'delete_site'),
(28, 'Can view site', 7, 'view_site'),
(29, 'Can add user model', 8, 'add_usermodel'),
(30, 'Can change user model', 8, 'change_usermodel'),
(31, 'Can delete user model', 8, 'delete_usermodel'),
(32, 'Can view user model', 8, 'view_usermodel'),
(33, 'Can add user token', 9, 'add_usertoken'),
(34, 'Can change user token', 9, 'change_usertoken'),
(35, 'Can delete user token', 9, 'delete_usertoken'),
(36, 'Can view user token', 9, 'view_usertoken'),
(37, 'Can add reset password', 10, 'add_resetpassword'),
(38, 'Can change reset password', 10, 'change_resetpassword'),
(39, 'Can delete reset password', 10, 'delete_resetpassword'),
(40, 'Can view reset password', 10, 'view_resetpassword'),
(41, 'Can add rule model', 11, 'add_rulemodel'),
(42, 'Can change rule model', 11, 'change_rulemodel'),
(43, 'Can delete rule model', 11, 'delete_rulemodel'),
(44, 'Can view rule model', 11, 'view_rulemodel'),
(45, 'Can add service model', 12, 'add_servicemodel'),
(46, 'Can change service model', 12, 'change_servicemodel'),
(47, 'Can delete service model', 12, 'delete_servicemodel'),
(48, 'Can view service model', 12, 'view_servicemodel'),
(49, 'Can add tokens model', 13, 'add_tokensmodel'),
(50, 'Can change tokens model', 13, 'change_tokensmodel'),
(51, 'Can delete tokens model', 13, 'delete_tokensmodel'),
(52, 'Can view tokens model', 13, 'view_tokensmodel');

-- --------------------------------------------------------

--
-- Structure de la table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_groups`
--

CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `auth_user_user_permissions`
--

CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint UNSIGNED NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL
) ;

-- --------------------------------------------------------

--
-- Structure de la table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(4, 'auth', 'user'),
(10, 'backendNew', 'resetpassword'),
(11, 'backendNew', 'rulemodel'),
(12, 'backendNew', 'servicemodel'),
(13, 'backendNew', 'tokensmodel'),
(8, 'backendNew', 'usermodel'),
(9, 'backendNew', 'usertoken'),
(5, 'contenttypes', 'contenttype'),
(6, 'sessions', 'session'),
(7, 'sites', 'site');

-- --------------------------------------------------------

--
-- Structure de la table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2023-10-29 14:13:35.371094'),
(2, 'auth', '0001_initial', '2023-10-29 14:13:36.979265'),
(3, 'admin', '0001_initial', '2023-10-29 14:13:37.333670'),
(4, 'admin', '0002_logentry_remove_auto_add', '2023-10-29 14:13:37.354767'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2023-10-29 14:13:37.370320'),
(6, 'contenttypes', '0002_remove_content_type_name', '2023-10-29 14:13:37.526857'),
(7, 'auth', '0002_alter_permission_name_max_length', '2023-10-29 14:13:37.671279'),
(8, 'auth', '0003_alter_user_email_max_length', '2023-10-29 14:13:37.703394'),
(9, 'auth', '0004_alter_user_username_opts', '2023-10-29 14:13:37.719266'),
(10, 'auth', '0005_alter_user_last_login_null', '2023-10-29 14:13:37.840122'),
(11, 'auth', '0006_require_contenttypes_0002', '2023-10-29 14:13:37.849153'),
(12, 'auth', '0007_alter_validators_add_error_messages', '2023-10-29 14:13:37.862067'),
(13, 'auth', '0008_alter_user_username_max_length', '2023-10-29 14:13:38.009371'),
(14, 'auth', '0009_alter_user_last_name_max_length', '2023-10-29 14:13:38.157638'),
(15, 'auth', '0010_alter_group_name_max_length', '2023-10-29 14:13:38.190360'),
(16, 'auth', '0011_update_proxy_permissions', '2023-10-29 14:13:38.202580'),
(17, 'auth', '0012_alter_user_first_name_max_length', '2023-10-29 14:13:38.378000'),
(18, 'backendNew', '0001_initial', '2023-10-29 14:13:38.681494'),
(19, 'backendNew', '0002_resetpassword_rulemodel_servicemodel_tokensmodel', '2023-10-29 14:13:38.925712'),
(20, 'backendNew', '0003_tokensmodel_spotifytoken', '2023-10-29 14:13:38.980362'),
(21, 'sessions', '0001_initial', '2023-10-29 14:13:39.091689'),
(22, 'sites', '0001_initial', '2023-10-29 14:13:39.163632'),
(23, 'sites', '0002_alter_domain_unique', '2023-10-29 14:13:39.217074');

-- --------------------------------------------------------

--
-- Structure de la table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `django_site`
--

CREATE TABLE `django_site` (
  `id` int NOT NULL,
  `domain` varchar(100) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `django_site`
--

INSERT INTO `django_site` (`id`, `domain`, `name`) VALUES
(1, 'example.com', 'example.com');

-- --------------------------------------------------------

--
-- Structure de la table `resetPassword`
--

CREATE TABLE `resetPassword` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `rules`
--

CREATE TABLE `rules` (
  `id` int NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int NOT NULL,
  `trigger_id` int NOT NULL,
  `triggerToken` varchar(255) DEFAULT NULL,
  `action_id` int NOT NULL,
  `actionToken` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `action` varchar(80) NOT NULL,
  `type` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `name`, `action`, `type`) VALUES
(1, 'Discord', 'When an user update his status', 'Reaction'),
(2, 'Discord', 'When an user is typing', 'Reaction'),
(3, 'Discord', 'When an user join the server', 'Reaction'),
(4, 'Discord', 'When an user is remove from the server', 'Reaction'),
(5, 'Discord', 'When an user is ban from the server', 'Reaction'),
(6, 'Discord', 'When an user is unban from the server', 'Reaction'),
(7, 'Discord', 'When a message is send on the server', 'Reaction'),
(8, 'Discord', 'When a channel is created', 'Reaction'),
(9, 'Discord', 'When a channel is updated', 'Reaction'),
(10, 'Discord', 'When a channel is deleted', 'Reaction'),
(11, 'Discord', 'When a message is pinned', 'Reaction'),
(12, 'Twitter', 'Post a tweet', 'Action'),
(14, 'Sheet', 'Add to a spreadsheet', 'Action'),
(15, 'Email', 'Send an email', 'Action'),
(17, 'Spotify', 'Follow a playlist', 'Action'),
(18, 'Spotify', 'Unfollow a playlist', 'Action'),
(19, 'Spotify', 'Unfollow an artist', 'Action'),
(20, 'Spotify', 'Follow an artist', 'Action'),
(21, 'Spotify', 'Follow an user', 'Action'),
(22, 'Spotify', 'Unfollow an user', 'Action'),
(23, 'Spotify', 'Save a track', 'Action'),
(24, 'Spotify', 'Unsave a track', 'Action'),
(25, 'Chess', 'When an user finish a game', 'Reaction'),
(26, 'Github', 'Create a repository', 'Action'),
(29, 'Twitter', 'User posted a tweet', 'Reaction'),
(31, 'Twitter', 'User gained a follower', 'Reaction'),
(32, 'Twitter', 'User lost a follower', 'Reaction'),
(33, 'Twitter', 'User joined a list', 'Reaction'),
(34, 'Twitter', 'User added a post to favorite', 'Reaction'),
(35, 'Twitter', 'User changed their description', 'Reaction'),
(36, 'Twitter', 'User changed their location', 'Reaction'),
(37, 'Twitter', 'User changed their banner', 'Reaction'),
(38, 'Twitter', 'User changed their profile picture', 'Reaction'),
(39, 'ClashRoyale', 'Player finished their game', 'Reaction'),
(40, 'ClashRoyale', 'Player changed clan', 'Reaction'),
(41, 'ClashRoyale', 'Player got a new clan role', 'Reaction'),
(42, 'ClashRoyale', 'Player has a new favorite card', 'Reaction'),
(43, 'ClashRoyale', 'Player donated a card', 'Reaction'),
(44, 'ClashOfClans', 'Player changed clan', 'Reaction'),
(45, 'ClashOfClans', 'Player got a new clan role', 'Reaction'),
(46, 'Weather', 'Temperature changed', 'Reaction'),
(47, 'Weather', 'Weather conditions changed', 'Reaction'),
(48, 'CoinGecko', 'Bitcoin value goes over / under limit', 'Reaction'),
(49, 'CoinGecko', 'Ethereum value goes over / under limit', 'Reaction'),
(50, 'Twitch', 'User stream status changed', 'Reaction'),
(51, 'Twitch', 'User stream title changed', 'Reaction'),
(52, 'Twitch', 'User description changed', 'Reaction'),
(53, 'Linkedin', 'Post a message on your linkedin feed', 'Action'),
(54, 'TFT', 'User finishes a game', 'Reaction'),
(55, 'Trello', 'Create a new organization', 'Action'),
(56, 'Trello', 'Create a new board', 'Action'),
(57, 'BrawlStar', 'User finishes a game', 'Reaction'),
(58, 'BrawlStar', 'User changes club', 'Reaction'),
(59, 'DateTime', 'On Specific Time', 'Reaction');
-- (60, 'Github', 'When a user push', 'Reaction'),
-- (61, 'Github', 'When a user create a repository', 'Reaction'),
-- (62, 'Github', 'When a user open a pull request', 'Reaction'),
-- (63, 'Github', 'When a user close a pull request', 'Reaction'),
-- (64, 'Github', 'When a user create a branch', 'Reaction');

-- --------------------------------------------------------

--
-- Structure de la table `tokens`
--

CREATE TABLE `tokens` (
  `user_id` int NOT NULL,
  `googleToken` varchar(255) DEFAULT NULL,
  `twitterToken` varchar(255) DEFAULT NULL,
  `githubToken` varchar(255) DEFAULT NULL,
  `discordToken` varchar(255) DEFAULT NULL,
  `spotifyToken` varchar(500) DEFAULT NULL,
  `linkedinToken` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `trelloToken` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `surname` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users_tokens`
--

CREATE TABLE `users_tokens` (
  `id` int NOT NULL,
  `token` varchar(80) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `user_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Index pour la table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Index pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  ADD KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`);

--
-- Index pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  ADD KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`);

--
-- Index pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`);

--
-- Index pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Index pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Index pour la table `django_site`
--
ALTER TABLE `django_site`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_site_domain_a2e37b91_uniq` (`domain`);

--
-- Index pour la table `resetPassword`
--
ALTER TABLE `resetPassword`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `rules`
--
ALTER TABLE `rules`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `users_tokens`
--
ALTER TABLE `users_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `users_tokens_user_id_a931395c_fk_users_id` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT pour la table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `django_site`
--
ALTER TABLE `django_site`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `resetPassword`
--
ALTER TABLE `resetPassword`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `rules`
--
ALTER TABLE `rules`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `users_tokens`
--
ALTER TABLE `users_tokens`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Contraintes pour la table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Contraintes pour la table `auth_user_groups`
--
ALTER TABLE `auth_user_groups`
  ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `auth_user_user_permissions`
--
ALTER TABLE `auth_user_user_permissions`
  ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`);

--
-- Contraintes pour la table `users_tokens`
--
ALTER TABLE `users_tokens`
  ADD CONSTRAINT `users_tokens_user_id_a931395c_fk_users_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

-- --------------------------------------------------------

--
-- Structure de la table `tft_api_key`
--

CREATE TABLE `tft_api_key` (
  `id` int NOT NULL,
  `api_key` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tft_api_key`
--
ALTER TABLE `tft_api_key`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tft_api_key`
--
ALTER TABLE `tft_api_key`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;
COMMIT;

INSERT INTO `tft_api_key` (`id`, `api_key`) VALUES
(1, 'RGAPI-4b385a81-43cb-417e-bd57-b7aabc9b4f95');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;