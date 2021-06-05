const express = require('express')
const router = new express.Router()
const Cat =require('../models/cat')
const multer =require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
      },
    filename: function(_req, file, cb){

      cb(null,file.fieldname + '-' + Date.now() + file.originalname);
    } 
  });
const upload =multer({
    storage: storage,
    limits:{
        fileSize:500000
    },
    fileFilter(req,file,cb){
       if(!file.originalname.match(/\.(jpg|jpeg|png)$/))
       {
        cb(new Error('Plaease Upload a image'))
       }
        cb(undefined,true)
      
    }, 
})


//insert cat
router.post('/cat',(req,res)=>{
    const cat =new Cat(req.body)
    cat.save()
    .then((result)=>{
        
        res.status(201).send(result)
    })
    .catch((error)=>{
        res.status(400).send(error.errors)
       // res.send(error.errors)
    })
})
//get all cats
router.get('/cats',(req,res)=>{
    Cat.find({}).then((cats)=>{
        res.send(cats)
    })
    .catch((error)=>{
        res.status(400).send(error.errors)
    })
})
//get cat by Id
router.get('/cats/:id', async (req,res) => {
    const cat_id=req.params.id
    try{
    const cat =await  Cat.findById(cat_id);
        if(!cat){
            return req.status(404).send()
        }
        res.send(cat)
    }catch(e){
       // console.log(e)
        res.status(400).send(e);
    }
})
//Update cats
router.patch('/cats/:id', async (req,res)=>{
    try{
        const cat =await Cat.findByIdAndUpdate(req.params.id,req.body,{new :true,runValidators:true})
        console.log(cat)
        if(!cat){
            return res.status(404).send()
        }
        res.send(cat)
    }catch(e){
        res.status(400).send(e);
    }
})

//Delete cat
router.delete('/cats/:id', async (req,res)=>{
    try{
        const cat =await Cat.findByIdAndDelete(req.params.id)
  
        if(!cat){
            return res.status(404).send()
        }
        res.send(cat)
    }catch(e){
        res.status(400).send(e);
    }
})
//Image Upload
router.post('/cat/image',upload.single('upload'),(req,res) =>{
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error:error.message})
})

module.exports=router