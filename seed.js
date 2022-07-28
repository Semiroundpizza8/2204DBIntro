const { Client } = require("pg");
const client = new Client("postgres://localhost:5444/puppystore");
// const client = new Client("postgres://localhost:5432/puppyStore");

console.log("Hello!");

/**
 * Function that takes in a puppy and adds that puppy to our database
 */

const puppy = {
    name: "); DROP TABLES puppies; ("
}
const createPuppy = async (puppy) => {
    const { name, age, email } = puppy;

    const data = await client.query(`
        INSERT INTO puppies (
            name,
            email,
            age
        ) VALUES (
           $1, $2, $3
        )
        RETURNING *;
    `, [name, email, age]);

    console.log(`${data.rows[0].name} was created`)
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
    `)

    // Fill those databases with new information 
    await createPuppy({
        name: "larry",
        email: 'larry@gmail.com',
        age: 10
    });

    await createPuppy({
        name: "izzy",
        email: 'izzy@gmail.com',
        age: 3
    });
    await createPuppy({
        name: "mae",
        email: 'mae@gmail.com',
        age: 5
    });

    // Query those databases and console.log() the result
    const puppies = await client.query('SELECT * FROM puppies;');
    console.log(puppies.rows)

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