const client = require('./client');

const getAllPuppies = async () => {
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

    return puppies
}

const getPuppyByName = async (name) => {
    const puppies = await getAllPuppies();
    return puppies.find(puppy => puppy.name === name);
}

const createPuppy = async (puppy) => {
    const { name, age, email, password, favoriteToy } = puppy;

    const data = await client.query(`
        INSERT INTO puppies (
            name,
            email,
            age,
            password,
            "favoriteToy"
        ) VALUES (
           $1, $2, $3, $4, $5
        )
        RETURNING *;
    `, [name, email, age, password, favoriteToy]);

    const createdPuppy = data.rows[0];
    console.log(`${createdPuppy.name} was created`)
};

module.exports = {
    getAllPuppies,
    getPuppyByName,
    createPuppy
}