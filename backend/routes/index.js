const express = require('express');
const authController = require('../controller/authController');
const router = express.Router();
const auth = require('../middlewares/auth');
const blogController = require('../controller/blogController');
const commentController = require('../controller/commentController');

router.get('/test', (req, res) => res.json({ msg: 'api test' }));

// user
// login
router.post('/login', authController.login);
// register
router.post('/register', authController.register);
// logout
router.post('/logout', auth, authController.logout);
// refresh
router.get('/refresh', authController.refresh);

// blog
// crud
// create
router.post('/blog', auth, blogController.create);
// read all blogs
router.get('/blog/all', auth, blogController.getAll);
// read blog by id
router.get('/blog/:id', auth, blogController.getById);
// update
router.put('/blog', auth, blogController.update);
// delete
router.delete('/blog/:id', auth, blogController.delete);

// comments
// create comment
router.post('/comment', auth, commentController.create);
// get comment
router.get('/comment/:id', auth, commentController.getById);
// read comment by blog id
// update
// delete

module.exports = router;