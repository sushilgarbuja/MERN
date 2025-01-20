require('dotenv').config()
const mongoose=require('mongoose')

// function add(){  
// }
// const add=()=>{
// }

async function connectToDatabase(){
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("Hey sushil database connected successfully")
}
module.exports=connectToDatabase