const express = require ("express");
const app = express();

app.get('/',(req,res)=>{
    res.send("hello welcome to new project")
});

app.listen(8000,()=>{
console.log("port is redy to start 8000!!!")
});