const express = require('express');
const router = express.Router();

// import middleware
const objectMiddleware = require('../middlewares/object');

// import controllers
const objectController = require('../controllers/object');

// routes dispo (CRUD)
router.get('/',objectController.getObjectList);
router.get('/:id',objectMiddleware,objectController.getOneObjectById);
router.post('/', objectController.createObject);
router.put('/:id', objectController.updateObject);
router.delete('/:id',  objectController.deleteObject);

module.exports = router;
