let express = require("express");
let app = express();
let users=require("./routes/user.js");
let posts=require("./routes/post.js");


app.use("/user",users)
app.use("/post",posts)



app.listen("3000",(req,res)=>{
    console.log("server is listening at 3000");
})


//Post Routes


