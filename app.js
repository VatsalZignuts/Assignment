const express = require ("express");
const app = express();
const ejs = require ('ejs');
const userRouter = require("./routers/user");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


app.use("/user", userRouter);

app.set('view engine', 'ejs');

app.use( express.static( "assets" ) );

app.use(bodyParser.json());


// app.get('/',(req,res)=>{
//     res.send("hello welcome to new project")
// });

// database

mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk?authSource=admin&ssl=false').then(() => {
    console.log("Database connected !!!");    
}).catch(err => {
    console.log('err :: ', err);
});


app.get("/", (req, res) => {
    res.json({ message: "working" });
  });
  
app.listen(8000,()=>{
console.log("port is redy to start 8000!!!")
});