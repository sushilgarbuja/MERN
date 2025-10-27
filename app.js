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
const fs = require('fs')
const cors = require('cors')


//cors is used to allow the request from different domains
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
)
)

connectToDatabase()

//for get
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
//for create post
app.post("/blog", upload.single("image"), async (req, res) => {
    const { title, subtitle, description } = req.body
    // console.log(req.file)
    let filename;
    if (req.file){
        filename = "http://localhost:3000/"+req.file.filename
    }else{
        filename = "https://cdn.mos.cms.futurecdn.net/i26qpaxZhVC28XRTJWafQS.jpeg"
    }
    // if (!title || !subtitle || !description) {
    //     return res.status(400).json({
    //         message: "Please provide all the required fields"
    //     })

    // }
    console.log(req.file)
    res.status(200).json({
        message: "Blog has been created successfully",
    })

    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        image: filename
    })
})
//for get all blogs
app.get("/blog", async (req, res) => {
    const blogs = await Blog.find() //it returns data in array
    res.status(200).json({
        message: "Blogs api has been called",
        data: blogs
    })
})
//for get single blog
app.get("/blog/:id", async (req, res) => {
    // console.log(req.params.id)
    const id = req.params.id
    // console.log(req.findById(id))
    const blog = await Blog.findById(id)
    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        })
    }
    res.status(200).json({
        message: "Blog api has been called",
        data: blog
    })

})

//for delete
app.delete("/blog/:id", async (req, res) => {
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image
    fs.unlink(`./storage/${imageName}`, (err) => {
        if (err) {
            console.log('File deleted!')
        }
        else {
            console.log('File not found, so not deleting.')
        }
    });
    await Blog.findByIdAndDelete(id)
    res.status(200).json({
        message: "Blog has been deleted"
    })
})

//blog edit
app.patch('/blog/:id', upload.single("image"), async (req, res) => {
    const id = req.params.id
    const { title, subtitle, description } = req.body
    let imageName
    if (req.file) {
        imageName = "http://localhost:3000/"+req.file.filename
        const blog = await Blog.findById(id)
        const oldImageName = blog.image
        fs.unlink(`./storage/${oldImageName}`, (err) => {
            if (err) {
                console.log('File deleted!')
            }
            else {
                console.log('File not found, so not deleting.')
            }
        })
    }
    await Blog.findByIdAndUpdate(id, {
        title: title,
        subtitle: subtitle,
        description: description,
        image: imageName
    })
    res.status(200).json({
        message: "Blog has been updated"
    })
})


app.use(express.static("./storage"))
app.listen(process.env.PORT, () => {
    console.log("node js project has been started...")
})

// mongodb+srv://sushilgarbuja82335:<db_password>@cluster0.3a5e0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0