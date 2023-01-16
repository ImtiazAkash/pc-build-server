const mongoose = require('mongoose')


const RamSchema = new mongoose.Schema({

    VendorName : {
        require : true,
        type : String
    },
    MemoryType : {
        require : true,
        type : String
    },
    BusSpeed : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    Capacity : {
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
    
    Price : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    }


})


module.exports = mongoose.model('ram', RamSchema)