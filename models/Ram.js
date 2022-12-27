const mongoose = require('mongoose')


const RamSchema = new mongoose.Schema({

    "Vendor Name" : {
        require : true,
        type : String
    },
    "Memory Type" : {
        require : true,
        type : String
    },
    "Bus Speed(Mhz)" : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    "Capacity(GB)" : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    Model : {
        require : true,
        type : String
    },
    
    "Price(tk)" : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }


})


module.exports = mongoose.model('ram', RamSchema)