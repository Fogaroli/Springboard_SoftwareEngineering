DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league;

CREATE TABLE seasons (
    id SERIAl PRIMARY KEY,
    season_name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT
);

CREATE TABLE teams (
    id SERIAl PRIMARY KEY,
    team_name TEXT NOT NULL,
    home_city TEXT NOT NULL,
    total_points INTEGER
);

CREATE TABLE players (
    id SERIAl PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    position text NOT NULL,
    team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL
);

CREATE TABLE matches (
    id SERIAl PRIMARY KEY,
    location TEXT NOT NULL,
    match_date DATE NOT NULL,
    host_team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL,
    visitor_team_id INTEGER REFERENCES teams(id) ON DELETE SET NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    game_time INTERVAL,
    match_id INTEGER REFERENCES matches(id) ON DELETE SET NULL,
    player_id INTEGER REFERENCES players(id) ON DELETE SET NULL
);

CREATE TABLE referees (
    id SERIAl PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT
);

CREATE TABLE referee_match (
    id SERIAL PRIMARY KEY,
    match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE,
    referee_id INTEGER REFERENCES referees(id) ON DELETE CASCADE
);


INSERT INTO seasons (start_date, end_date, season_name) VALUES
('2024-02-15', '2024-06-08', 'Spring Tournament');

INSERT INTO teams (team_name,home_city) VALUES
('Porto', 'Porto'),
('Rio Ave', 'Vila do Conde');

INSERT INTO players (first_name, last_name, position, team_id) VALUES
('Samuel', 'Araujo', 'Advanced', 1),
('Ronaldo', '', 'Advanced', 2);