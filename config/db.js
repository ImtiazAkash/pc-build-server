const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected: ${conn.connection.host}`.cyan.bold);
    
}
mongoose.set('strictQuery', false)

module.exports = connectDB