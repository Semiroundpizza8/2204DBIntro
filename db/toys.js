const client = require('./client');

const getAllToys = async () => {
    const data = await client.query(`
        SELECT * FROM toys;
    `);

    return data.rows;
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

module.exports = {
    getAllToys,
    createToy
}