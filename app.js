//postman api testing tool, backend developer ko lagi frontend
const express=require('express')
const app=express()

app.get("/",(req,res)=>{
    res.json({
        message:"hello world"
    })
})
app.get("/about",(req,res)=>{
    res.json({
        message:"hello about"
    })
})

app.listen(3000,()=>{
    console.log("node js project has been started...")
})