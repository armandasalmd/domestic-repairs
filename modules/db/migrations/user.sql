DROP TABLE IF EXISTS user;

CREATE TABLE user (
    username TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    phone_no TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL
);