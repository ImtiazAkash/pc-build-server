const express = require('express')
const Ram = require('../models/Ram')
const router = express.Router()


router.get('/', async(req, res, next) =>{
    try{

        let ram = await Ram.find()

        if(!ram){
            return res.status(400).json({
                msg : "no Ram found"
            })
        }

        res.status(200).json({
            count : ram.length,
            Ram : ram
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    //const { Vendor Name, memoryType, busSpeed, capacity, Model, Price } = req.body

    try{
        
        let ram = new Ram()

        ram.VendorName = req.body.VendorName
        ram.Model = req.body.Model
        ram.MemoryType = req.body.MemoryType
        ram.BusSpeed = req.body.BusSpeed
        ram.Capacity = req.body.Capacity
        ram.Price = req.body.Price

        await ram.save()


        res.json({
            success : true,
            msg : 'item added',
            Ram : ram
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', async(req, res, next) =>{

    try{

        let item = await Ram.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Ram.findByIdAndUpdate(req.params.id, req.body, {
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

        let item = await Ram.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Ram.findByIdAndDelete(req.params.id)

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