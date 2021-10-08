DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS password_reset_codes;

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

CREATE TABLE password_reset_codes(
      id SERIAL PRIMARY KEY,
      code VARCHAR(255) NOT NULL CHECK(code <> ''),
      email VARCHAR(255) NOT NULL CHECK(email <> ''),  
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );