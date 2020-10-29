// const mongoose   = require('mongoose');
// require('dotenv').config();

// // set mongoose Promise to Bluebird
// mongoose.Promise = Promise;

// // Exit application on error
// mongoose.connection.on('error', (err) => {
//  console.log(`MongoDB connection error: ${err}`);
//  process.exit(-1);
// });

// /**
// * Connect to mongo db
// *
// * @returns {object} Mongoose connection
// * @public
// */
// exports.connect = () => {
//    mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,{
//    keepAlive: 1,
//    useNewUrlParser: true,
//    autoIndex: false,
//    useFindAndModify:true,
//    useCreateIndex:true  
// });
//  return mongoose.connection;
// };


const mongoose = require('mongoose');
require('dotenv').config();

// set mongoose Promise to Bluebird
mongoose.Promise = Promise;

// Exit application on error
mongoose.connection.on('error', (err) => {
   console.log(`MongoDB connection error: ${err}`);
   process.exit(-1);
});

/**
* Connect to mongo db
*
* @returns {object} Mongoose connection
* @public
*/
exports.connect = () => {
   //mongoose.connect(`mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`,
      mongoose.connect('mongodb+srv://Ruah_raja:Ruah_raja@cluster0-ug8hd.mongodb.net/Chatapp?retryWrites=true&w=majority',
      {
         keepAlive: 1,
         useNewUrlParser: true,
         autoIndex: false,
         useFindAndModify: true,
         useCreateIndex: true
      });
   return mongoose.connection;
};

