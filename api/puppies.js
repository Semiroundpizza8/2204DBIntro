const router = require('express').Router();

const { getAllPuppies } = require('../db');

router.get('/', async (req, res, next) => {
    const puppies = await getAllPuppies();
    res.send(puppies);
});

module.exports = router;