const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('Database Connected'))
    .catch(error=>console.log(error))
}

module.exports = connectDB