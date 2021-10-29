const express = require('express');
const router = express.Router();

const BlogController = require('../controllers/BlogController');
const permits = require('../handler/oauthorization');

router.post('/add', BlogController.Add);
router.get('/all', permits('User', 'Admin'), BlogController.GetAll);
router.patch("/:id", permits('Admin'), BlogController.Update);

router.delete("/:id", permits("Admin"), BlogController.DeActivateUser);

module.exports = router;