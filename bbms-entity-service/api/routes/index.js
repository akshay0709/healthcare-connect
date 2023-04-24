var express = require('express');
var router = express.Router();

var ctrlEntity = require('../controllers/entity.controller.js');

router
    .route('/:username')
    .get(ctrlEntity.getEntity)
    .put(ctrlEntity.updateEntity)
    .delete(ctrlEntity.deleteEntity)

module.exports = router;