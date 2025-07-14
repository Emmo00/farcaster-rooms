const {Router} = require('express');
const userRouter = require('./user');
const roomsRouter = require('./rooms');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({message: 'Welcome to the Farcaster Rooms API'});
});

router.use('/user', userRouter);
router.use('/rooms', roomsRouter);

module.exports = router;