const express = require('express');
const router = express.Router();

// import middleware
const objectMiddleware = require('../middlewares/object');

// import controllers
const objectController = require('../controllers/object');

// routes dispo (CRUD)
router.get('/',objectController.getObjectList);
router.get('/:id',objectMiddleware,objectController.getOneObjectById);

module.exports = router;
