CREATE USER IF NOT EXISTS 'DiegoDS'@'%' IDENTIFIED BY 'Dd425';
GRANT ALL PRIVILEGES ON blog_db.* TO 'DiegoDS'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(255) NOT NULL,
    capital_city VARCHAR(255) NOT NULL,
    size INT NOT NULL,
    off_language VARCHAR(255) NOT NULL,
    PIB INT NOT NULL
);
