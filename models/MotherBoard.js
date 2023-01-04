const mongoose = require('mongoose')


const MotherBoardSchema = new mongoose.Schema({

    VendorName : {
        require : true,
        type : String
    },
    Model : {
        require : true,
        type : String
    },
    MemoryType : {
        require : true,
        type : String
    },
    MemorySlots : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    MaxMemory : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    Price : {
        require : true,
        type : Number,

        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    SupportedCPU : {
        require : true,
        type : String
        
    }


})


module.exports = mongoose.model('mother_board', MotherBoardSchema)
