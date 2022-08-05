// const client = new Client("postgres://localhost:5432/puppyStore");
// const client = require('./db/client')
// const {
//     getAllPuppies,
//     createPuppy
// } = require('./db/puppies');
// const {
//     createToy
// } = require('./db/toys');
// const {
//     createTrick
// } = require('./db/tricks');
// const {
//     createPuppyTrick
// } = require('./db/puppies_tricks');
const db = require('./db')
const {
    client,
    getAllPuppies,
    createPuppy,
    createPuppyTrick,
    createToy,
    createTrick
} = db;

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
        password VARCHAR(255) NOT NULL,
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
        "trickId" INTEGER REFERENCES tricks(id),
        proficiency INTEGER,
        "timeLearned" DATE,
        command VARCHAR(255),
        UNIQUE(command, "puppyId")
      );
    `)
    // Puppy 1, Trick 1, "Sit"
    // Puppy 1, Trick 2, "Sit Down"

    // Fill those databases with new information 
    await createToy({
        name: "ball",
        color: "green"
    })

    await createToy({
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
        password: "password1",
        age: 10,
        favoriteToy: 1
    });

    await createPuppy({
        name: "izzy",
        email: 'izzy@gmail.com',
        password: "password2",
        age: 3,
        favoriteToy: 2
    });

    await createPuppy({
        name: "mae",
        email: 'mae@gmail.com',
        password: "password3",
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
    const puppies = await getAllPuppies();
    console.log(puppies);

    console.log("Done running!")
}

rebuildDb()
    .catch(console.error)
    .finally(() => client.end());