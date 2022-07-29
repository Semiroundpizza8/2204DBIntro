const { Client } = require("pg");
const client = new Client("postgres://localhost:5444/puppystore");
// const client = new Client("postgres://localhost:5432/puppyStore");

console.log("Hello!");

/**
 * Function that takes in a puppy and adds that puppy to our database
 */

const createPuppy = async (puppy) => {
    const { name, age, email, favoriteToy } = puppy;

    const data = await client.query(`
        INSERT INTO puppies (
            name,
            email,
            age,
            "favoriteToy"
        ) VALUES (
           $1, $2, $3, $4
        )
        RETURNING *;
    `, [name, email, age, favoriteToy]);

    const createdPuppy = data.rows[0];
    console.log(`${createdPuppy.name} was created`)
};

const createToy = async (toy) => {
    const { name, color } = toy;

    const data = await client.query(`
        INSERT INTO toys (
            name,
            color
        ) VALUES (
            $1,
            $2
        )
        RETURNING *;
    `, [name, color]);

    const createdToy = data.rows[0];
    console.log(`${createdToy.name} was created`)
};

client.connect();

const rebuildDb = async () => {
    // Clear out all our existing databases
    console.log("Dropping all tables...");
    await client.query(`
        DROP TABLE IF EXISTS puppies;
        DROP TABLE IF EXISTS toys;
    `);

    // Create new versions of those databases
    console.log("Creating new tables...")
    await client.query(`
      CREATE TABLE toys (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          color VARCHAR (255) NOT NULL
      );

      CREATE TABLE puppies (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        "isCute" BOOLEAN DEFAULT true,
        age INT,
        "favoriteToy" INTEGER REFERENCES toys(id)
      );
    `)

    // Fill those databases with new information 
    await createToy({
        // id: 1
        // id: asdfsgjknjk-2353jnjkdfg-345lmkl456
        name: "ball",
        color: "green"
    })

    await createToy({
        // id: 2
        name: "rope",
        color: "red"
    })

    await createPuppy({
        name: "larry",
        email: 'larry@gmail.com',
        age: 10,
        favoriteToy: 1
    });

    await createPuppy({
        name: "izzy",
        email: 'izzy@gmail.com',
        age: 3,
        favoriteToy: 2
    });

    await createPuppy({
        name: "mae",
        email: 'mae@gmail.com',
        age: 5,
        favoriteToy: 1
    });

    // Query those databases and console.log() the result
    const puppies = await client.query('SELECT * FROM puppies;');
    console.log(puppies.rows)

    const toys = await client.query('SELECT * FROM toys;');
    console.log(toys.rows)

    console.log("Done running!")
}

rebuildDb()
    .catch(console.error)
    .finally(() => client.end());


// Example express route using db methods
// app.get('/puppies', async (req, res, next) => {

//     // Grabbing the info / doing the operation to your DB
//     const puppies = await client.query('SELECT * FROM PUPPIES');
    
//     // Passing that info back to the user
//     res.send(puppies);
// })

// app.post('/puppies', async (req, res, next) => {
//     const { puppy } = req.body
    
//     await createPuppy(puppy);

//     res.sendStatus(204);
// })