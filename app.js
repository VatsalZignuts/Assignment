const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const user = require("./routers/user")

 const ejs = require ('ejs');

 app.use( express.static( "assets" ) );

app.use(bodyParser.json());

mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk?authSource=admin&ssl=false').then(() => {
    console.log("Database connected !!!");    
}).catch(err => {
    console.log('err :: ', err);
});

 app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.get("/home", (req, res) => {
    res.render('pages/home/home')
});

app.use("/user", user);

app.listen(8000, (req, res) => {
  console.log(`Server Started at PORT 4000`);
});







































// const express = require ("express");
// const app = express();
// const ejs = require ('ejs');
// const userRouter = require("./routers/user");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");


// app.use("/user", userRouter);

// app.set('view engine', 'ejs');

// app.use( express.static( "assets" ) );

// app.use(bodyParser.json());


// // app.get('/',(req,res)=>{
// //     res.send("hello welcome to new project")
// // });

// // database

// mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk?authSource=admin&ssl=false').then(() => {
//     console.log("Database connected !!!");    
// }).catch(err => {
//     console.log('err :: ', err);
// });


// app.get("/", (req, res) => {
//     res.json({ message: "working" });
//   });
  
// app.listen(8000,()=>{
// console.log("port is redy to start 8000!!!")
// });