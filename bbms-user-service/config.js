module.exports = {
    dburl : 'mongodb://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@mongodb:' + process.env.DB_PORT + '/' + process.env.DB_DATABASE_NAME + '?authSource=admin'
};
