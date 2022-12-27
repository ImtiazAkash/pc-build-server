const express = require('express')
const Processor = require('../models/Processor')
const PRO = require('../models/Processor')
const router = express.Router()


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



router.post('/', async(req, res, next) =>{


    try{
        
        let processor = new Processor()

        processor['Vendor Name'] = req.body['Vendor Name']
        processor.Model = req.body.Model
        processor.Cores = req.body.Cores
        processor.Threads = req.body.Threads
        processor.Generation = req.body.Generation
        processor['V-RAM'] = req.body['V-RAM']
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




router.put('/:id', async(req, res, next) =>{

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


router.delete('/:id', async(req, res, next) =>{

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