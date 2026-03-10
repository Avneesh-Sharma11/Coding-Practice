CREATE TABLE users(
    id VARCHAR(50) PRIMARY KEY,
    username VARCHAR(50) UNIQUE,
    img VARCHAR(7000),
    content VARCHAR(8000),
    password VARCHAR(50) NOT NULL
);