const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');

router.post('/login', login); // Works for both admin & user

const bcrypt = require('bcrypt');
const User = require('../models/User');
const EntryLog = require("../models/EntryLog");


// // TEMPORARY ROUTE TO CREATE USER/ADMIN
// router.post('/register', async (req, res) => {
//   const { username, password, role } = req.body;

//   try {
//     const existing = await User.findOne({ username });
//     if (existing) {
//       return res.status(400).json({ message: 'Username already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({
//       username,
//       password: hashedPassword,
//       role
//     });

//     res.status(201).json({ message: 'User created', user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


module.exports = router;
