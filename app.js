//postman api testing tool, backend developer ko lagi frontend
//git add .
//git commit -m "message"
//git push yedi main cha vane hoina vane git push origin branch ko nam
//json full form is javascript object notation
//json le data bokcha
require('dotenv').config()
const express=require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app=express()
//ghokne
app.use(express.json())


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
app.post("/blog",async (req,res)=>{
    // const title=req.body.title
    // const subtitle=req.body.subtitle
    // const description=req.body.description
    // const image=req.body.image
    //destructure
    console.log(req.body)
    const {title,subtitle,description,image}=req.body
    await Blog.create({
        title:title,
        subtitle:subtitle,
        description:description,
        image:image
    })
    res.status(200).json({
        message:"Blog api has been called"
    })
})
app.listen(process.env.PORT,()=>{
    console.log("node js project has been started...")
})

// mongodb+srv://sushilgarbuja82335:<db_password>@cluster0.3a5e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0