var express = require('express');
var router = express.Router();

var ctrlUserAppointment = require('../controllers/user.appointment.controller.js');
var ctrlEntityAppointment = require('../controllers/entity.appointment.controller.js');

router
    .route('/appointments/users')
    .post(ctrlUserAppointment.createAppointment)

router
    .route('/appointments/users/:username')
    .get(ctrlUserAppointment.getAllAppointment)

router
    .route('/appointments/users/:username/:appointmentId')
    .get(ctrlUserAppointment.getOneAppointment)
    .put(ctrlUserAppointment.updateAppointment)
    .delete(ctrlUserAppointment.deleteAppointment)

router
    .route('/appointments/entities/:username')
    .get(ctrlEntityAppointment.getAllAppointment)

router
    .route('/appointments/entities/:username/:appointmentId')
    .get(ctrlEntityAppointment.getOneAppointment)
    .put(ctrlEntityAppointment.updateAppointment)
    .delete(ctrlEntityAppointment.deleteAppointment)

module.exports = router;