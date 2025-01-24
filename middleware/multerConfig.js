const multer=require('multer')

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./storage")//cb(errror,success)
    },
    filename:function(req,file,cb){
        cb(null,"Sushil-"+file.originalname)
    }
})

module.exports={multer,storage}