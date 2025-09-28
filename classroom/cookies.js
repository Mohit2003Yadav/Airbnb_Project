let express = require("express");
let app = express();
let cookieParser=require("cookie-parser");
app.use(cookieParser("secretcode"));

app.get("/cookiesRoute",(req,res)=>{
    res.cookie("first","cookies");
    res.cookie("hello","namaste");
    res.send("cookies route");
})

app.get("/",(req,res)=>{
    console.log(req.cookies);
    res.send('cookies ');

})

app.get("/greet",(req,res)=>{
    let {name="anonymius"}=req.cookies;
    res.send(`hii ${name}`);
    
})

app.get("/getsignedcookie",(req,res)=>{
    res.cookie('made-in',"India",{signed:true});
    res.send("signed cookie send ");

})

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies);
    res.send("verified");
    
})


app.listen("3000",(req,res)=>{
    console.log("server is listening at 3000");
})

