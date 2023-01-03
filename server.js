const express = require('express')
const color = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = express()


app.use(morgan('dev'))
app.use(express.json({}))
app.use(express.json({
    extended : true
}))

dotenv.config({
    path: './config/config.env'
})

connectDB()

app.use('/api/auth', require('./routes/user'))
app.use('/api/getpc', require('./routes/buildPc'))
app.use('/api/getpc2', require('./routes/buildPc2'))
app.use('/api/getpcwithgpu', require('./routes/buildWithGpu'))
app.use('/api/motherboard', require('./routes/motherBoard'))
app.use('/api/monitor', require('./routes/monitor'))
app.use('/api/powersupply', require('./routes/powerSupply'))
app.use('/api/processor', require('./routes/processor'))
app.use('/api/ram', require('./routes/ram'))
app.use('/api/storage', require('./routes/storage'))
app.use('/api/gpu', require('./routes/gpu'))


app.use((req, res, next)=>{

    res.status(404).json({
        message : 'URL Not Found'
    })

})


const PORT = process.env.PORT || 3005

app.listen(PORT, console.log(`server running on port ${PORT}`.red.underline.bold))

