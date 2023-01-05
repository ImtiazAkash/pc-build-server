const express = require('express')

const motherBoard = require('../models/MotherBoard')
const processor = require('../models/Processor')
const ram = require('../models/Ram')
const storage = require('../models/Storage')
const powerSupply = require('../models/PowerSupply')
const monitor = require('../models/Monitor')
const gpu = require('../models/GraphicsCard')

const router = express.Router()

router.get('/', async(req, res, next) =>{
    try{

        const motherboardQuery = {Price : {"$lte":parseInt(req.query.mb)}}
        

        let MB = await motherBoard.find(motherboardQuery).sort({"Price" : -1}).limit(1)

        if(MB.length === 0){
            return res.json({
                success : false,
                msg : "no motherboard found"
            })
        }
        const motherObject = Object.assign({}, MB)

        //processor

        const processorQuery = {Price : {$lte:parseInt(req.query.pros)}, VendorName : {"$eq" : motherObject[0].SupportedCPU}}

        let process = await processor.find(processorQuery).sort({"Price" : -1}).limit(1)


        if(process.length === 0){
            return res.json({
                success : false,
                msg : "no processor found for the suitable motherboard or within the given buidget"
            })
        }


        //Ram


        const ratio = 0.50


        const ramQuery = {Price : {$lte:parseInt(req.query.ram)*ratio},
        MemoryType : {"$eq" : motherObject[0].MemoryType},
        Capacity : {"$lte" : motherObject[0].MaxMemory}}
        

        let Ram = await ram.find(ramQuery).sort({"Price" : -1}).limit(1)

        if(Ram.length === 0){
            return res.json({
                success : false,
                msg : "no ram found"
            })
        }


        //power supply

        const powerQuery = {Price : {$lte:parseInt(req.query.ps)}}

        let power = await powerSupply.find(powerQuery).sort({"Price" : -1}).limit(1)


        if(power.length === 0){
            return res.json({
                success : false,
                msg : "no power supply found"
            })
        }

        //storage

        //SSD

        const storageQuery = {Price : {$lte:parseInt(req.query.st)*0.35},
            Type : {$eq : "SSD"}}

        let storeSSD = await storage.find(storageQuery).sort({"Price" : -1}).limit(1)
        if(storeSSD.length === 0){
            return res.json({
                success : false,
                msg : "no storage found"
            })
        }


        //HDD

        const storage2Query = {Price : {$lte:parseInt(req.query.st)*0.65},
            Type : {$eq : "HDD"}}

        let storeHDD = await storage.find(storage2Query).sort({"Price" : -1}).limit(1)
        if(storeHDD.length === 0){
            return res.json({
                success : false,
                msg : "no storage found"
            })
        }

        //monitor

        const monitorQuery = {Price : {$lte:parseInt(req.query.monitor)}}


        const moni = await monitor.find(monitorQuery).sort({"Price" : -1}).limit(1)

        if(moni.length === 0){
            return res.json({
                success : false,
                msg : "no monitor found"
            })
        }


        //Graphics Card

        const gpuQuery  = {Price : {$lte:parseInt(req.query.gpu)}}

        const graphics = await gpu.find(gpuQuery).sort({"Price" : -1}).limit(1)

        if(graphics.length === 0){
            return res.json({
                success : false,
                msg : "no graphics card found"
            })
        }


        const ramObject = Object.assign({}, Ram)
        const proObject = Object.assign({}, process)
        const powerObject = Object.assign({}, power)
        const storeHDDObject = Object.assign({}, storeHDD)
        const storeSSDObject = Object.assign({}, storeSSD)
        const moniObject = Object.assign({}, moni)
        const gpuObject = Object.assign({}, graphics)
        

        let total = motherObject[0].Price + proObject[0].Price + ramObject[0].Price + ramObject[0].Price + gpuObject[0].Price +
        powerObject[0].Price + storeHDDObject[0].Price + storeSSDObject[0].Price + moniObject[0].Price



        res.status(200).json({
            success : true,
            msg : "all component found",
            totalBudget : total,
            MOTHERBOARD : motherObject[0],
            RAM1 : ramObject[0],
            RAM2 : ramObject[0],
            PROCESSOR : proObject[0],
            POWERSUPPLY : powerObject[0],
            SSD : storeSSDObject[0],
            HDD : storeHDDObject[0],
            GRAPHICSCARD : gpuObject[0],
            MONITOR : moniObject[0]
        })
        

    }catch(err){
        console.log(err);
        next(err)
    }
})


module.exports = router