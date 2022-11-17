const express = require('express');
const router = express.Router();

// import controllers
const userController = require('../controllers/user');

// routes dispo (CRUD)
router.get('/',userController.getUserList);
router.get('/:id',userController.getOneUserById);
router.post('/signup', userController.createUser);
router.post('/login', userController.login);
router.put('/:id', userController.updateUser);
router.delete('/:id',  userController.deleteUser);

module.exports = router;
