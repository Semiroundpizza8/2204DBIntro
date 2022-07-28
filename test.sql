-- Create new tables in your database
CREATE TABLE puppies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "isCute" BOOLEAN DEFAULT true,
  age INT
);

CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    color VARCHAR (255) NOT NULL
);

-- Fill tables with info / create new entries
INSERT INTO puppies (name)
           VALUES ('larry');

INSERT INTO puppies (name)
           VALUES ('mae');

INSERT INTO puppies (name)
           VALUES ('izzy');

INSERT INTO puppies (name,    email,             "isCute", age)
       VALUES       ('larry', 'larry@gmail.com', true,     10);

INSERT INTO puppies (name, email, "isCute", age)
           VALUES ('izzy', 'izzy@gmail.com', false, 2);

-- Grabbing info from the database
SELECT * FROM puppies;

-- Clearing out / destroying your tables
DROP TABLE IF EXISTS puppies;
DROP TABLE IF EXISTS toys;