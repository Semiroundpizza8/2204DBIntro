const client = require('./client')

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

module.exports = {
    createTrick
}