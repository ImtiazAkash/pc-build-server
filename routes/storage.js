const express = require('express')
const Storage = require('../models/Storage')
const router = express.Router()
const checkLogin = require ('../middlewares/checkLogin')


router.get('/', async(req, res, next) =>{
    try{

        let storage = await Storage.find()

        if(!storage){
            return res.status(400).json({
                msg : "no Storage found"
            })
        }

        res.status(200).json({
            count : storage.length,
            STORAGE : storage
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})



router.post('/', checkLogin, async(req, res, next) =>{

    const { VendorName, Model, Type, Interface, Capacity, Price } = req.body

    try{
        
        let storage = new Storage()

        storage.VendorName = VendorName
        storage.Model = Model
        storage.Type = Type
        storage.Interface = Interface
        storage.Capacity = Capacity
        storage.Price = Price

        await storage.save()


        res.json({
            success : true,
            msg : 'item added',
            STORAGE : storage
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})




router.put('/:id', checkLogin, async(req, res, next) =>{

    try{

        let item = await Storage.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Storage.findByIdAndUpdate(req.params.id, req.body, {
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

        let item = await Storage.findById(req.params.id)

        if(!item){
            return res.status(400).json({
                msg : "item does not exist"
            })
        }



        item = await Storage.findByIdAndDelete(req.params.id)

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