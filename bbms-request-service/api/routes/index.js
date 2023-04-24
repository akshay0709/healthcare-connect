var express = require('express');
var router = express.Router();

var ctrlRequest = require('../controllers/request.controller.js');
var ctrlRespond = require('../controllers/respond.controller.js');
var ctrlNotification = require('../controllers/notification.controller');

router
    .route('/requests')
    .post(ctrlRequest.createRequest);

router
    .route('/requests/:username')
    .get(ctrlRequest.getAllRequests);

router
    .route('/requests/:username/:requestId')
    .get(ctrlRequest.getOneRequest)
    .put(ctrlRequest.updateOneRequest)
    .delete(ctrlRequest.deleteOneRequest);

router
    .route('/respond/:username')
    .get(ctrlRespond.getAllRequests);

router
    .route('/respond/:username/:requestId')
    .get(ctrlRespond.getOneRequest)
    .put(ctrlRespond.updateOneRequest)
    .delete(ctrlRespond.deleteOneRequest);

router
    .route('/notifications/:username')
    .get(ctrlNotification.getNotifications);

module.exports = router;