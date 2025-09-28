let express = require("express");
let router=express.Router();

router.get("",(req,res)=>{
    res.send("this user root ");
})

router.get("/:id",(req,res)=>{
    res.send("get for user id ")
})

router.post("/",(req,res)=>{
    res.send("post for users")
})

router.delete("/:id",(req,res)=>{
    res.send("Delete for user")
})

module.exports=router;