//postman api testing tool, backend developer ko lagi frontend
//git add .
//git commit -m "message"
//git push yedi main cha vane hoina vane git push origin branch ko nam
//json full form is javascript object notation
//json le data bokcha
require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
//ghokne
app.use(express.json())

const { multer, storage } = require('./middleware/multerConfig')

const upload = multer({ storage: storage })

connectToDatabase()


app.get("/", (req, res) => {
    res.status(200).json({
        message: "hello world"
    })
})
app.get("/about", (req, res) => {
    res.json({
        message: "hello about"
    })
})
app.post("/blog", upload.single("image"), async (req, res) => {
    const { title, subtitle, description } = req.body
    // console.log(req.file)
    const filename =req.file.filename
    if (!title || !subtitle || !description) {
        return res.status(400).json({
            message: "Please provide all the required fields"
        })
    }
    console.log(req.file)
    res.status(200).json({
        message: "Blog api has been called"
    })

await Blog.create({
    title: title,
    subtitle: subtitle,
    description: description,
    image:filename
    })
})
app.get("/blog",async(req,res)=>{
   const blogs= await Blog.find() //it returns data in array
   res.status(200).json({
    message:"Blogs api has been called",
    data: blogs
   })
})
app.listen(process.env.PORT, () => {
    console.log("node js project has been started...")
})

// mongodb+srv://sushilgarbuja82335:<db_password>@cluster0.3a5e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0