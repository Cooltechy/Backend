const mongoose = require('mongoose')

const {MONGODB_URL} = process.env



function connectDB(){
    mongoose.connect(MONGODB_URL)
    .then(()=>console.log('Database Connected'))
    .catch(error=>console.log(error))
}

module.exports = connectDB