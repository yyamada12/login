CREATE DATABASE IF NOT EXISTS login_sample;
use login_sample;
CREATE TABLE IF NOT EXISTS users (
    `id` INT UNSIGNED AUTO_INCREMENT NOT NULL,
    `email` VARCHAR(256) NOT NULL UNIQUE,
    `password` binary(60) NOT NULL,
    PRIMARY KEY (id)
);
GRANT SELECT,
    INSERT,
    UPDATE,
    DELETE ON login_sample.* TO 'logintest' @'%';
