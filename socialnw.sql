DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
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

DROP TABLE IF EXISTS events;
CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    place TEXT,
    events TEXT,
    event_date DATE,
    event_time TIME
);


INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Schöneberg',
    'Full Moon of Gemini | Festival of GoodWill',
    '2021-10-28',
    '17:30:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Schöneberg',
    'Decoding The Science of Twin Hearts Meditation',
    '2021-10-28',
    '17:35:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Kreuzberg',
    'Do You Follow Your Inner Voice or Inner Noise?',
    '2021-10-28',
    '17:25:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Kreuzberg',
    'I am not a Buddhist. Can I Join the Vesak Meditation?!',
    '2021-10-28',
    '17:15:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Schoneberg',
    'Meditation on Twin Hearts | Spiritual Technology, Par Excellence',
    '2021-10-28',
    '17:20:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Kreuzberg',
    'Meditation, Service & Your Chakras',
    '2021-10-28',
    '17:10:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'PrenzlauerBerg',
    'How Meditation can be Relief at Times!',
    '2021-10-28',
    '17:05:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Kreuzberg',
    'The Impact of GMCKS Teachings on Quality of Life',
    '2021-10-28',
    '17:45:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Charlottenburg',
    'Getting Ready for the Wesak Meditation',
    '2021-10-28',
    '17:50:22'
);
INSERT INTO events (place, events, event_date, event_time) VALUES (
    'Mitte',
    'How to Meditate Even When You are Busy',
    '2021-10-28',
    '17:55:22'
);
