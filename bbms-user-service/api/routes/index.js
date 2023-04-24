var express = require('express');
var router = express.Router();

var ctrlUser = require('../controllers/user.controller.js');

router
    .route('/:username')
    .get(ctrlUser.getUser)
    .put(ctrlUser.updateUser)
    .delete(ctrlUser.deleteUser)

module.exports = router;