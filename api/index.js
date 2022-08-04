const router = require('express').Router();

const puppiesRouter = require('./puppies');
router.use('/puppies', puppiesRouter);

const toysRouter = require('./toys');
router.use('/toys', toysRouter);

router.get('/', (req, res, next) => {
    res.send("In API Router!")
})

module.exports = router;