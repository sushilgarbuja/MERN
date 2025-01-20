const mongoose=require('mongoose')
//create schema by using nosql orm in mongoose
//schema is a class using pascal naming convention

const Schema=mongoose.Schema

// const blogSchema=new mongoose.Schema({})
const blogSchema=new Schema({
    title:{
        type:String,
        unique:true
    },
    subtitle:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
})
//() cha vane method ho
const Blog=mongoose.model('Blog',blogSchema)
module.exports=Blog