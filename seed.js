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

const createTrick = async (trick) => {
    const { name } = trick;
    const data = await client.query(`
        INSERT INTO tricks (
            name
        ) VALUES (
            $1
        )
        RETURNING *;
    `, [name]);

    const createdTrick = data.rows[0];
    console.log(`${createdTrick.name} was created`)
}

const createPuppyTrick = async (puppyTrick) => {
    const { puppyId, trickId } = puppyTrick;

    const data = await client.query(`
        INSERT INTO puppies_tricks (
            "puppyId",
            "trickId"
        ) VALUES (
            $1, $2
        )
        RETURNING *;
    `, [puppyId, trickId]);

    const createdPuppyTrick = data.rows[0];
    console.log("================")
    console.log(createdPuppyTrick)
    console.log("================")

    console.log(`${createdPuppyTrick.puppyId} connected to ${createdPuppyTrick.trickId}`)
}

client.connect();

const rebuildDb = async () => {
    // Clear out all our existing databases
    console.log("Dropping all tables...");
    await client.query(`
        DROP TABLE IF EXISTS puppies_tricks;
        DROP TABLE IF EXISTS puppies;
        DROP TABLE IF EXISTS toys;
        DROP TABLE IF EXISTS tricks;
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

      CREATE TABLE tricks (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );

      CREATE TABLE puppies_tricks (
        "puppyId" INTEGER REFERENCES puppies(id),
        "trickId" INTEGER REFERENCES tricks(id)
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
    });

    await createTrick({ name: 'fetch' });
    await createTrick({ name: 'shake' });
    await createTrick({ name: 'sit' });
    await createTrick({ name: 'rollover' });

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

    await createPuppyTrick({ puppyId: 1, trickId: 1 })
    await createPuppyTrick({ puppyId: 2, trickId: 1 })
    await createPuppyTrick({ puppyId: 3, trickId: 1 })

    await createPuppyTrick({ puppyId: 2, trickId: 2 })
    await createPuppyTrick({ puppyId: 3, trickId: 2 })

    await createPuppyTrick({ puppyId: 3, trickId: 3 })

    // Query those databases and console.log() the result
    const data = await client.query('SELECT * FROM puppies;');
    const puppies = data.rows;

    for (var i = 0; i < puppies.length; i++) {
        const currPuppy = puppies[i];

        const data = await client.query(`
            SELECT tricks.name FROM puppies_tricks
            JOIN tricks ON puppies_tricks."trickId" = tricks.id  
            WHERE puppies_tricks."puppyId" = $1;
        `, [currPuppy.id]);

        data.rows = data.rows.map(trickObj => trickObj.name)

        currPuppy.tricks = data.rows;
    }

    console.log(puppies)

    // const toys = await client.query('SELECT * FROM toys;');
    // console.log(toys.rows)

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