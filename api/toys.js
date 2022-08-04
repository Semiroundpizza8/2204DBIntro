const router = require('express').Router();
const {
    getAllToys
} = require('../db');

router.get('/', async (req, res, next) => {
    const toys = await getAllToys();
    res.send(toys)
})

module.exports = router;