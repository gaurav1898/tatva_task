const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');
const permits = require('../handler/oauthorization');

router.post('/signup', UserController.Add);

router.post('/signin/:role',UserController.SignIn);

module.exports = router;