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
        {"$match" : {"Vendor Name" : {"$eq" : motherObject[0].SupportedCPU}}},
        { "$sample": { "size": 1 } }]

        let process = await processor.aggregate(processorQuery)


        if(process.length === 0){
            return res.json({
                success : false,
                msg : "no processor found for the suitable motherboard or within the given buidget"
            })
        }


        //Ram

        const ramQuery = [{"$match" : {"Price(tk)" : {$lte:parseInt(req.query.ram)+500, $gte:parseInt(req.query.ram)-500}}},
        {"$match" : {"Memory Type" : {"$eq" : motherObject[0].MemoryType}}},
        {"$match" : {"Capacity(GB)" : {"$lte" : motherObject[0]['MaxMemory (GB)']}}},
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

        const storageQuery = [{"$match" : {Price : {$lte:parseInt(req.query.st)+500, $gte:parseInt(req.query.st)-500}}},
        { "$sample": { "size": 1 } }]

        let store = await storage.aggregate(storageQuery)
        if(store.length === 0){
            return res.json({
                success : false,
                msg : "no storage supply found"
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
        const storeObject = Object.assign({}, store)
        const moniObject = Object.assign({}, moni)
        

        let total = motherObject[0].Price + proObject[0].Price + ramObject[0]["Price(tk)"] + 
        powerObject[0].Price + storeObject[0].Price + moniObject[0].Price



        res.status(200).json({
            success : true,
            "total price" : total,
            msg : "all component found",
            MOTHERBOARD : MB,
            RAM : Ram,
            PROCESSOR : process,
            POWERSUPPLY : power,
            STORAGE : store,
            MONITOR : moni
        })

    }catch(err){
        console.log(err);
        next(err)
    }
})


module.exports = router