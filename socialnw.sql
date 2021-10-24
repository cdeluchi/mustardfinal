DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS events;


CREATE TABLE users(
      id SERIAL PRIMARY KEY,
      first VARCHAR(255) NOT NULL,
      last VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      imgUrl VARCHAR(255),
      bio VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

DROP TABLE IF EXISTS password_reset_codes;
CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      code VARCHAR(255) NOT NULL CHECK(code <> ''),
      email VARCHAR(255) NOT NULL CHECK(email <> ''),  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

CREATE TABLE friendships(
      id SERIAL PRIMARY KEY,
      sender_id INT REFERENCES users(id) NOT NULL,
      recipient_id INT REFERENCES users(id) NOT NULL,
      accepted BOOLEAN DEFAULT false);

CREATE TABLE messages(
   id SERIAL PRIMARY KEY,
   sender_id INT REFERENCES users(id) NOT NULL,
   message VARCHAR(255) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    place TEXT,
    events TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO events (place, events) VALUES (
    'Schöneberg',
    'Twin Hearts Meditation',
);

INSERT INTO events (place, events) VALUES (
    'Schöneberg',
    'Soul Meditation Berlin'
);

INSERT INTO events (place, events) VALUES (
    'Kreuzberg',
    'Dyian Yoga Level I’'
);

INSERT INTO events (place, events) VALUES (
    'Schöneberg',
    'Stress and Burnout Prevention meditation'
);

INSERT INTO events (place, events) VALUES (
    'Neuköln',
    'Pranayama Joy of Breathing'
);

INSERT INTO events (place, events) VALUES (
    'Prenzlauer berg',
    'LOW a guided sonic meditation for Groups'
);

INSERT INTO events (place, events) VALUES (
    'Schöneberg',
    'Sleep Well Meditation'
);

INSERT INTO events (place, events) VALUES (
    'Kreuzberg',
    'Own Your energy, Own Your Life'
);
