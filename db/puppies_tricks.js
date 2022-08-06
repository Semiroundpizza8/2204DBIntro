const client = require('./client');

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
    console.log(`${createdPuppyTrick.puppyId} connected to ${createdPuppyTrick.trickId}`)
}

const deletePuppyTricksById = async (puppyId) => {
    await client.query(`
        DELETE FROM puppies_tricks
        WHERE "puppyId" = $1;
    `, [puppyId]);

    return true;
}

module.exports = {
    createPuppyTrick,
    deletePuppyTricksById
}