let express=require('express');
let router=express.Router();

router.get("/posts",(req,res)=>{
    res.send("Hi,I am post  root!")
})

router.get("/post/:id",(req,res)=>{
    res.send("get for user id ")
})

router.post("/post",(req,res)=>{
    res.send("post for post")
})

router.delete("/post/:id",(req,res)=>{
    res.send("Delete for user")
})

module.exports=router;