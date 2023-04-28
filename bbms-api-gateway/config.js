module.exports = {
    registerProxy : 'http://' + process.env.BBMS_REGISTER_SERVICE_NAME + ':' + process.env.BBMS_REGISTER_SERVICE_PORT,
    authenticationProxy : 'http://' + process.env.BBMS_AUTHENTICATION_SERVICE_NAME + ':' + process.env.BBMS_AUTHENTICATION_SERVICE_PORT,
    userInformationProxy : 'http://' + process.env.BBMS_USER_SERVICE_NAME + ':' + process.env.BBMS_USER_SERVICE_PORT,
    entityInformationProxy : 'http://' + process.env.BBMS_ENTITY_SERVICE_NAME + ':' + process.env.BBMS_ENTITY_SERVICE_PORT,
    appointmentProxy : 'http://' + process.env.BBMS_APPOINTMENT_SERVICE_NAME + ':' + process.env.BBMS_APPOINTMENT_SERVICE_PORT,
    searchProxy : 'http://' + process.env.BBMS_SEARCH_SERVICE_NAME + ':' + process.env.BBMS_SEARCH_SERVICE_PORT,
    eventProxy : 'http://' + process.env.BBMS_EVENTS_SERVICE_NAME + ':' + process.env.BBMS_EVENTS_SERVICE_PORT,
    emailProxy : 'http://' + process.env.BBMS_EMAIL_SERVICE_NAME + ':' + process.env.BBMS_EMAIL_SERVICE_PORT,
    inventoryProxy : 'http://' + process.env.BBMS_INVENTORY_SERVICE_NAME + ':' + process.env.BBMS_INVENTORY_SERVICE_PORT,
    requestProxy : 'http://' + process.env.BBMS_REQUEST_SERVICE_NAME + ':' + process.env.BBMS_REQUEST_SERVICE_PORT,
}