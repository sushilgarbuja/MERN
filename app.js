//postman api testing tool, backend developer ko lagi frontend
//git add .
//git commit -m "message"
//git push yedi main cha vane hoina vane git push origin branch ko nam
//json full form is javascript object notation
//json le data bokcha
require('dotenv').config()
const express=require('express')
const connectToDatabase = require('./database')
const app=express()

connectToDatabase()


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"hello world"
    })
})
app.get("/about",(req,res)=>{
    res.json({
        message:"hello about"
    })
})

app.listen(process.env.PORT,()=>{
    console.log("node js project has been started...")
})

// mongodb+srv://sushilgarbuja82335:<db_password>@cluster0.3a5e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0