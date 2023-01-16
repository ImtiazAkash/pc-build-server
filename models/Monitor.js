const mongoose = require('mongoose')


const MonitorSchema = new mongoose.Schema({

    VendorName : {
        require : true,
        type : String
    },
    Model : {
        require : true,
        type : String
    },
    
    Resolution : {
        require : true,
        type : String
    },
    
    DisplayInHz : {
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
    }


})


module.exports = mongoose.model('monitor', MonitorSchema)