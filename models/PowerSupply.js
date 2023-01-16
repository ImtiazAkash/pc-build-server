const mongoose = require('mongoose')


const PowerSupplySchema = new mongoose.Schema({

    VendorName : {
        require : true,
        type : String
    },
    Model : {
        require : true,
        type : String
    },
    PowerInW : {
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


module.exports = mongoose.model('power_supply', PowerSupplySchema)