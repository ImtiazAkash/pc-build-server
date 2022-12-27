const express = require('express')
const Monitor = require('../models/Monitor')
const router = express.Router()


router.get('/', async(req, res, next) =>{
    try{

        let monitor = await Monitor.find()

        if(!monitor){
            return res.status(400).json({
                msg : "no Monitor found"
            })
        }

        res.status(200).json({
            count : monitor.length,
            MONITOR : monitor
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    const { VendorName, Model,Resolution, DisplayInHz, Price } = req.body

    try{
        
        let monitor = new Monitor()

        monitor.VendorName = VendorName
        monitor.Model = Model
        monitor.Resolution = Resolution
        monitor.DisplayInHz = DisplayInHz
        monitor.Price = Price

        await monitor.save()


        res.json({
            success : true,
            msg : 'item added',
            MONITOR : monitor
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', async(req, res, next) =>{

    try{

        let item = await Monitor.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Monitor.findByIdAndUpdate(req.params.id, req.body, {
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

        let item = await Monitor.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Monitor.findByIdAndDelete(req.params.id)

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