const express = require('express')
const MotherBoard = require('../models/MotherBoard')
const MB = require('../models/MotherBoard')
const router = express.Router()


router.get('/', async(req, res, next) =>{
    try{

        let motherboard = await MB.find()

        if(!motherboard){
            return res.status(400).json({
                msg : "no motherboard found"
            })
        }

        res.status(200).json({
            count : motherboard.length,
            motherboard : motherboard
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    

    try{
        
        let motherBoard = new MotherBoard()

        motherBoard.VendorName = req.body.VendorName
        motherBoard.Model = req.body.Model
        motherBoard.MemoryType = req.body.MemoryType
        motherBoard.MemorySlots = req.body.MemorySlots
        motherBoard['MaxMemory (GB)'] = req.body['MaxMemory (GB)']
        motherBoard.Price = req.body.Price
        motherBoard.SupportedCPU = req.body.SupportedCPU
        motherBoard.Gen = req.body.Gen

        await motherBoard.save()


        res.json({
            success : true,
            msg : 'motherboard added',
            motherBoard : motherBoard
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', async(req, res, next) =>{

    try{

        let item = await MB.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await MB.findByIdAndUpdate(req.params.id, req.body, {
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

        let item = await MB.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await MB.findByIdAndDelete(req.params.id)

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