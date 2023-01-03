const express = require('express')

const motherBoard = require('../models/MotherBoard')
const processor = require('../models/Processor')
const ram = require('../models/Ram')
const storage = require('../models/Storage')
const powerSupply = require('../models/PowerSupply')
const monitor = require('../models/Monitor')

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

        const processorQuery = {Price : {$lte:parseInt(req.query.pros)},"Vendor Name" : {"$eq" : motherObject[0].SupportedCPU}}

        let process = await processor.find(processorQuery).sort({"Price" : -1}).limit(1)


        if(process.length === 0){
            return res.json({
                success : false,
                msg : "no processor found for the suitable motherboard or within the given buidget"
            })
        }


        //Ram

        const ramQuery = {"Price(tk)" : {$lte:parseInt(req.query.ram)*0.50},
        "Memory Type" : {"$eq" : motherObject[0].MemoryType},
        "Capacity(GB)" : {"$lte" : motherObject[0]['MaxMemory (GB)']}}
        

        let Ram = await ram.find(ramQuery).sort({"Price(tk)" : -1}).limit(1)

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


        const ramObject = Object.assign({}, Ram)
        const proObject = Object.assign({}, process)
        const powerObject = Object.assign({}, power)
        const storeHDDObject = Object.assign({}, storeHDD)
        const storeSSDObject = Object.assign({}, storeSSD)
        const moniObject = Object.assign({}, moni)
        

        let total = motherObject[0].Price + proObject[0].Price + ramObject[0]["Price(tk)"] + 
        powerObject[0].Price + storeHDDObject[0].Price + storeSSDObject[0].Price + moniObject[0].Price



        res.status(200).json({
            success : true,
            msg : "all component found",
            totalBudget : total,
            MOTHERBOARD : MB,
            RAM : Ram,
            PROCESSOR : process,
            POWERSUPPLY : power,
            SSD : storeSSD,
            HDD : storeHDD,
            MONITOR : moni
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})


module.exports = router