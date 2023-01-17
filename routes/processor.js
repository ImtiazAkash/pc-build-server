const express = require('express')
const Processor = require('../models/Processor')
const PRO = require('../models/Processor')
const router = express.Router()
const checkLogin = require('../middlewares/checkLogin')


router.get('/', async(req, res, next) =>{
    try{

        let Processor = await PRO.find()

        if(!Processor){
            return res.status(400).json({
                msg : "no Processor found"
            })
        }

        res.status(200).json({
            count : Processor.length,
            processor : Processor
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', checkLogin, async(req, res, next) =>{


    try{
        
        let processor = new Processor()

        processor.VendorName = req.body.VendorName
        processor.Model = req.body.Model
        processor.Cores = req.body.Cores
        processor.Threads = req.body.Threads
        processor.Series = req.body.Series
        processor.VideoRam = req.body.VideoRam
        processor.Price = req.body.Price

        await processor.save()


        res.json({
            success : true,
            msg : 'processor added',
            PROCESSOR : processor
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', checkLogin, async(req, res, next) =>{

    try{

        let item = await PRO.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await PRO.findByIdAndUpdate(req.params.id, req.body, {
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


router.delete('/:id', checkLogin, async(req, res, next) =>{

    try{

        let item = await PRO.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await PRO.findByIdAndDelete(req.params.id)

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