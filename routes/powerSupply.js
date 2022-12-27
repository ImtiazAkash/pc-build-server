const express = require('express')
const PowerSupply = require('../models/PowerSupply')
const PS = require('../models/PowerSupply')
const router = express.Router()


router.get('/', async(req, res, next) =>{
    try{

        let powerSupply = await PS.find()

        if(!powerSupply){
            return res.status(400).json({
                msg : "no Power Supply found"
            })
        }

        res.status(200).json({
            count : powerSupply.length,
            power_supply : powerSupply
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    const { VendorName, Model, PowerInW, Price } = req.body

    try{
        
        let powerSupply = new PowerSupply()

        powerSupply.VendorName = VendorName
        powerSupply.Model = Model
        powerSupply.PowerInW = PowerInW
        powerSupply.Price = Price

        await powerSupply.save()


        res.json({
            success : true,
            msg : 'power Supply added',
            power_supply : powerSupply
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', async(req, res, next) =>{

    try{

        let item = await PS.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await PS.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        })

        res.status(200).json({
            msg : "successfully updated",
            items : item
        })




    }catch(err){
        console.log(err);
        next(err)
    }

})


router.delete('/:id', async(req, res, next) =>{

    try{

        let item = await PS.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await PS.findByIdAndDelete(req.params.id)

        res.status(200).json({
            msg : "successfully deleted",
            items : item
        })




    }catch(err){
        console.log(err);
        next(err)
    }



})



module.exports = router