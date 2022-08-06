const router = require('express').Router();
const jwt = require('jsonwebtoken');

const { SECRET } = process.env;

const { requireUser } = require('./utils');
const { getAllPuppies, getPuppyByName, deletePuppy } = require('../db');

router.get('/', async (req, res, next) => {
    console.log("IN GETALLPUPPIES: ", req.puppy)

    const puppies = await getAllPuppies();
    res.send(puppies);
});

// DELETE localhost:3000/api/puppies/1
router.delete('/:id', requireUser, async (req, res, next) => {
    const didDelete = await deletePuppy(req.params.id);
    res.send(`Puppy ${req.params.id} deleted!`);
});

router.post('/login', async (req, res, next) => {
    const { name, password } = req.body;

    // Check to see that a username and password was provided
    if (!name || !password) {
        res.status(500).send("ERROR: No username or password was provided")
    }

    // Check to see that the given info matches a user
    const puppy = await getPuppyByName(name);
    console.log(puppy);

    if (puppy.password === password) {
        // If it does, give back a token
        const token = jwt.sign(puppy, SECRET);
        res.send(token)
    }
    else {
        // If it doesn't, give back an error 
        res.status(500).send("ERROR: Incorrect username or password")
    }
})

module.exports = router;