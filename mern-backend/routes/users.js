const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.find();
  res.render('index', { users });
});

router.get('/new', (req, res) => {
  res.render('users/new');
});


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
