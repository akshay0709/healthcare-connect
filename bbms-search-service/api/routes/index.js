var express = require('express');
var router = express.Router();

var ctrlSearchEntities = require('../controllers/entitysearch.controller.js');

router
    .route('/entities')
    .get(ctrlSearchEntities.getEntities)

module.exports = router;
