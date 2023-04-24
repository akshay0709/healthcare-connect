var express = require('express');
var router = express.Router();

var ctrlEvent = require('../controllers/event.controller.js');

router
    .route('/events')
    .post(ctrlEvent.createEvent)
    .get(ctrlEvent.getEventsByLocation)

router
    .route('/events/:username')
    .get(ctrlEvent.getEventsByEntity)

router
    .route('/events/:username/:eventId')
    .get(ctrlEvent.getOneEventByEntityAndId)
    .put(ctrlEvent.updateEventByEntity)
    .delete(ctrlEvent.deleteEventByEntity)

module.exports = router;