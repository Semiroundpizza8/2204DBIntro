const jwt = require("jsonwebtoken");
const router = require('express').Router();
const { SECRET } = process.env;

router.use(async (req, res, next) => {
    const auth = req.header("Authorization");
    const token = auth.slice(7);

    const puppyObj = jwt.verify(token, SECRET);
    req.puppy = puppyObj;

    console.log(puppyObj);
    next();
})

const puppiesRouter = require('./puppies');
router.use('/puppies', puppiesRouter);

const toysRouter = require('./toys');
router.use('/toys', toysRouter);

router.get('/', (req, res, next) => {
    res.send("In API Router!")
})

module.exports = router;