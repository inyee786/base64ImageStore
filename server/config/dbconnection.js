const mongoConnection = require('mongoose');

// MongoDB URL for database connection
const dbHost = 'mongodb://0.0.0.0:27017/images';
// const dbHost = `${process.argv[2]}/maya`;
console.log(dbHost);

// Connect to mongodb
mongoConnection.connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = mongoConnection;