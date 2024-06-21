DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist;

CREATE TABLE regions(
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE categories(
    id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAl PRIMARY KEY,
    username TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT,
    preferred_region_id INTEGER REFERENCES regions(id) ON DELETE SET NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    location TEXT NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    region_id INTEGER Not NULL REFERENCES regions(id) ON DELETE CASCADE
);

CREATE TABLE posts_categories(
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

INSERT INTO regions (region_name, description) VALUES
('West Coast', 'West BC and Islands'),
('Montain', 'EAST BC and WEST AB'),
('Prairies', 'AB to ON');

INSERT INTO categories (category_name, description) VALUES
('household', NULL),
('Tools', 'Hand Tools Only');

INSERT INTO users (username, first_name, last_name, preferred_region_id) VALUES
('spider', 'Peter', 'Parker', 1);

INSERT INTO posts (title, text, location, user_id, region_id) VALUES
('drill', 'Excelent hand drill', 'Vancouver', 1, 1);

INSERT INTO posts_categories (post_id, category_id) VALUES (1, 2);