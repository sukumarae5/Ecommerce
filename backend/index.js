const express = require('express');
var app = express();

app.get("/",(req,res)=>{
    res.send("Working")
})

app.listen(8080,()=>{
    console.log("Running");
})

