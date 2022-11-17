const express = require('express');
const router = express.Router();

// import middleware
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');

// import controllers
const objectController = require('../controllers/object');

// routes dispo (CRUD)
router.get('/',[auth, logger], objectController.getObjectList);
router.get('/:id', objectController.getOneObjectById);
router.post('/', [logger, auth], objectController.createObject);
router.put('/:id', logger, objectController.updateObject);
router.delete('/:id', logger, objectController.deleteObject);

module.exports = router;
