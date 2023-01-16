const mongoose = require('mongoose')


const StorageSchema = new mongoose.Schema({

    VendorName : {
        require : true,
        type : String
    },
    Model : {
        require : true,
        type : String
    },
    Type : {
        require : true,
        type : String
    },
    Interface : {
        require : true,
        type : String
    },
    
    Capacity : {
        require : true,
        type : String
    },
    
    Price : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }


})


module.exports = mongoose.model('storage', StorageSchema)