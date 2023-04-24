var express = require('express');
var router = express.Router();

var ctrlUser = require('../controllers/user.controller.js');
var ctrlEntity = require('../controllers/entity.controller.js');

router
    .route('/user')
    .post(ctrlUser.register);

router
    .route('/entity')
    .post(ctrlEntity.register);

module.exports = router;
