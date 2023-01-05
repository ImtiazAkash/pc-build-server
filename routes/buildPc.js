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

        const motherboardQuery = [{"$match" : {Price : {$lte:parseInt(req.query.mb)+3000, $gte:parseInt(req.query.mb)-3000}}},
        { "$sample": { "size": 1 } }]

        let MB = await motherBoard.aggregate(motherboardQuery)

        if(MB.length === 0){
            return res.json({
                success : false,
                msg : "no motherboard found"
            })
        }
        const motherObject = Object.assign({}, MB)

        //processor

        // const processorQuery = [{"$match" : {Price : {$lte:parseInt(req.query.pros)}}},
        // {"$match" : {"Vendor Name" : {"$eq" : motherObject[0].SupportedCPU}}},
        // { "$sample": { "size": 1 } }]

        const processorQuery = [{"$match" : {Price : {$lte:parseInt(req.query.pros)+1000, $gte:parseInt(req.query.pros)-1000 }}},
        {"$match" : {VendorName : {"$eq" : motherObject[0].SupportedCPU}}},
        { "$sample": { "size": 1 } }]

        let process = await processor.aggregate(processorQuery)


        if(process.length === 0){
            return res.json({
                success : false,
                msg : "no processor found for the suitable motherboard or within the given buidget"
            })
        }


        //Ram

        let ratio = 0.50

        if(req.query.ram <3700){
            ratio = 1
        }

        const ramQuery = [{"$match" : {Price : {$lte:parseInt(req.query.ram)*ratio+500, $gte:parseInt(req.query.ram)*ratio-500}}},
        {"$match" : {MemoryType : {"$eq" : motherObject[0].MemoryType}}},
        {"$match" : {Capacity : {"$lte" : motherObject[0].MaxMemory}}},
        { "$sample": { "size": 1 } }]

        let Ram = await ram.aggregate(ramQuery)

        if(Ram.length === 0){
            return res.json({
                success : false,
                msg : "no ram found"
            })
        }


        //power supply

        const powerQuery = [{"$match" : {Price : {$lte:parseInt(req.query.ps)+500, $gte:parseInt(req.query.ps)-500}}},
        { "$sample": { "size": 1 } }]

        let power = await powerSupply.aggregate(powerQuery)

        // console.log(req.query.ps);
        // console.log(power);

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
                msg : "no SSD found"
            })
        }


        //HDD

        const storage2Query = {Price : {$lte:parseInt(req.query.st)*0.65},
            Type : {$eq : "HDD"}}

        let storeHDD = await storage.find(storage2Query).sort({"Price" : -1}).limit(1)
        if(storeHDD.length === 0){
            return res.json({
                success : false,
                msg : "no HDD found"
            })
        }

        //monitor

        const monitorQuery = [{"$match" : {Price : {$lte:parseInt(req.query.monitor)+1000, $gte:parseInt(req.query.monitor)-1000}}},
        { "$sample": { "size": 1 } }]


        const moni = await monitor.aggregate(monitorQuery)

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
        

        let total = motherObject[0].Price + proObject[0].Price + ramObject[0].Price + 
        powerObject[0].Price + storeHDDObject[0].Price + storeSSDObject[0].Price + moniObject[0].Price



        if(req.query.ram <3700){

            res.status(200).json({
                success : true,
                msg : "all component found",
                totalBudget : total,
                MOTHERBOARD : motherObject[0],
                RAM1 : ramObject[0],
                PROCESSOR : proObject[0],
                POWERSUPPLY : powerObject[0],
                SSD : storeSSDObject[0],
                HDD : storeHDDObject[0],
                MONITOR : moniObject[0]
            })
            
        }else{

            res.status(200).json({
                success : true,
                msg : "all component found",
                totalBudget : total+ramObject[0].Price,
                MOTHERBOARD : motherObject[0],
                RAM1 : ramObject[0],
                RAM2 : ramObject[0],
                PROCESSOR : proObject[0],
                POWERSUPPLY : powerObject[0],
                SSD : storeSSDObject[0],
                HDD : storeHDDObject[0],
                MONITOR : moniObject[0]
            })

        }

    }catch(err){
        console.log(err);
        next(err)
    }
})


module.exports = router