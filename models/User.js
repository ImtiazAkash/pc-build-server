const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true,
    },
    username : {
        type: String,
        require :true
    },

    avatar : {
        type : String 
    },

    email : {
        type: String,
        require: true
    },

    password : {
        type : String,
        require : true
    }

})


module.exports = mongoose.model('user', userSchema)