const app = require('./src/app/express.config');
const mongoose = require('./src/app/db.config');
require('dotenv').config()



// mongodb connect

mongoose.connect();


app.listen(9000, () => {
    console.log('listening on port 9000!!');
});



module.exports = app;
