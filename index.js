const express = require('express')
const app = express()
const path = require('path')
const {limiter} = require('./RateLimiter')
const PORT = process.env.PORT || 8000
const {connectToMongoDB} = require("./Connection/Connect")

const  AnimeRoute  = require('./Routes/AnimeRoute')



//....................................
//MongoDB Connect
const dotenv = require('dotenv')
dotenv.config({ path: '.env' });


const url = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/TestDB";
// In case you do not have MONGO_URI


connectToMongoDB(url)  

//.....................................
 
app.use(limiter);
app.use(express.json())   
app.use(express.static(path.resolve("./public")))

//......................................

app.use('/', AnimeRoute)



app.listen(PORT, ()=> console.log(`Running Server at ${PORT}`))