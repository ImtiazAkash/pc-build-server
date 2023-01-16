const express = require('express')
const checkLogin = require('../middlewares/checkLogin')
const GraphicsCard = require('../models/GraphicsCard')
const router = express.Router()



router.get('/',  async(req, res, next) =>{
    try{

        let graphics_card = await GraphicsCard.find()

        if(!graphics_card){
            return res.json({
                msg : "no graphics card found"
            })
        }

        res.status(200).json({
            count : graphics_card.length,
            GraphicsCard : graphics_card
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', async(req, res, next) =>{

    const { VendorName, Model, Type, Capacity, Resolution, Price } = req.body

    try{
        
        let gpu = new GraphicsCard()

        gpu.VendorName = VendorName
        gpu.Model = Model
        gpu.Type = Type
        gpu.Capacity = Capacity
        gpu.Resolution = Resolution
        gpu.Price = Price

        await gpu.save()


        res.json({
            success : true,
            msg : 'item added',
            GraphicsCard : gpu
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', async(req, res, next) =>{

    try{

        let item = await GraphicsCard.findById(req.params.id)

        if(!item){
            return res.json({
                msg : "item does not exist"
            })
        }



        item = await GraphicsCard.findByIdAndUpdate(req.params.id, req.body, {
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

        let item = await GraphicsCard.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await GraphicsCard.findByIdAndDelete(req.params.id)

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