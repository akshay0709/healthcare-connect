var express = require('express');
var router = express.Router();

var ctrlUserAuth = require('../controllers/userauth.controller.js');
var ctrlEntityAuth = require('../controllers/entityauth.controller.js');
var ctrlSuperUser = require('../controllers/superuser.controller.js');

router
    .route('/user')
    .post(ctrlUserAuth.login);

router
    .route('/entity')
    .post(ctrlEntityAuth.login);

router
    .route('/superuser')
    .post(ctrlSuperUser.login)
    .get(ctrlEntityAuth.pendingactivations)

router
    .route('/superuser/:id')
    .put(ctrlSuperUser.activate)

module.exports = router;