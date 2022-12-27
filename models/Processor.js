const mongoose = require('mongoose')


const ProcessorSchema = new mongoose.Schema({

    "Vendor Name" : {
        require : true,
        type : String
    },
    Model : {
        require : true,
        type : String
    },
    Cores : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    Threads : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    Generation : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    "V-RAM" : {
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


module.exports = mongoose.model('processor', ProcessorSchema)
