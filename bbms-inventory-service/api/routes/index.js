var express = require('express');
var router = express.Router();

var ctrlInventory = require('../controllers/inventory.controller.js');

router
    .route('/inventory')
    .post(ctrlInventory.createInventory);

router
    .route('/inventory/:username')
    .get(ctrlInventory.getInventoryByUsername)
    .put(ctrlInventory.updateInventory)
    .delete(ctrlInventory.deleteInventoryByUsername);

module.exports = router;