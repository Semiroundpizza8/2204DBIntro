-- Create new tables in your database
CREATE TABLE puppies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  "isCute" BOOLEAN DEFAULT true,
  age INT,
  "favoriteToy" INTEGER REFERENCES toys(id)
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

INSERT INTO toys (
    name,
    color
) VALUE (
    'ball',
    'green'
)

-- Grabbing info from the database
SELECT * FROM puppies;

SELECT * FROM puppies WHERE puppies.id = 3;
SELECT * FROM puppies WHERE puppies."favoriteToy" = 1;

SELECT * FROM puppies 
WHERE puppies."favoriteToy" = 1
AND puppies.age = 10;

SELECT * FROM puppies
JOIN toys 
ON puppies."favoriteToy" = toys.id;

SELECT * FROM puppies
JOIN toys ON puppies."favoriteToy" = toys.id
WHERE toys.name = 'rope'
AND puppies.age = 3;

SELECT
    puppies.name AS "puppyName",
    puppies.email, 
    toys.name AS "toyName" 
    FROM puppies
JOIN toys ON puppies."favoriteToy" = toys.id;

-- Clearing out / destroying your tables
DROP TABLE IF EXISTS puppies;
DROP TABLE IF EXISTS toys;