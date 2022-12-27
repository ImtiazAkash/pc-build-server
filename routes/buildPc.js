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
            return res.status(400).json({
                success : false,
                msg : "no motherboard found"
            })
        }
        const motherObject = Object.assign({}, MB)

        //processor

        const processorQuery = [{"$match" : {Price : {$lte:parseInt(req.query.pros)}}},
        {"$match" : {"Vendor Name" : {"$eq" : motherObject[0].SupportedCPU}}},
        { "$sample": { "size": 1 } }]

        let process = await processor.aggregate(processorQuery)

        // console.log(process);

        if(process.length === 0){
            return res.status(400).json({
                success : false,
                msg : "no processor found for the suitable motherboard or within the given buidget"
            })
        }


        //Ram

        const ramQuery = [{"$match" : {"Price(tk)" : {$lte:parseInt(req.query.ram)}}},
        {"$match" : {"Memory Type" : {"$eq" : motherObject[0].MemoryType}}},
        {"$match" : {"Capacity(GB)" : {"$lte" : motherObject[0]['MaxMemory (GB)']}}},
        { "$sample": { "size": 1 } }]

        let Ram = await ram.aggregate(ramQuery)

        if(Ram.length === 0){
            return res.status(400).json({
                success : false,
                msg : "no ram found"
            })
        }


        //power supply

        const powerQuery = [{"$match" : {Price : {$lte:parseInt(req.query.ps)}}},
        { "$sample": { "size": 1 } }]

        let power = await powerSupply.aggregate(powerQuery)

        // console.log(req.query.ps);
        // console.log(power);

        if(power.length === 0){
            return res.status(400).json({
                success : false,
                msg : "no power supply found"
            })
        }

        //storage

        const storageQuery = [{"$match" : {Price : {$lte:parseInt(req.query.st)}}},
        { "$sample": { "size": 1 } }]

        let store = await storage.aggregate(storageQuery)
        if(store.length === 0){
            return res.status(400).json({
                success : false,
                msg : "no storage supply found"
            })
        }

        //monitor

        const monitorQuery = [{"$match" : {Price : {$lte:parseInt(req.query.monitor)}}},
        { "$sample": { "size": 1 } }]


        const moni = await monitor.aggregate(monitorQuery)

        if(moni.length === 0){
            return res.status(400).json({
                success : false,
                msg : "no monitor found"
            })
        }



        res.status(200).json({
            success : true,
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