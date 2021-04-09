const axios = require("axios");
const e = require("express");
var express = require("express");
var exphbs  = require('express-handlebars');
var cors = require("cors");
var app = express();
var empdata = require("./employeesmock");
var userdata = require("./usersmock")
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
var products = require('./products')
var heroes = require('./heroes')
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors())
let count = 1;
var employees = empdata.data;
var users = [
    {
        username:'praveen',
        password:'123',
        email:"praveen@gmail.com",
        place:"Hyderbad"
    },
    {
        username:'lucky',
        password:'456',
        email:"lucky@gmail.com",
        place:"warangal"
    }
]
emps=['praveen','rahul']

app.get("/mycounter",(req,res)=>{
    count++;
    res.json({count})
})

app.get("/products",(req,res)=>{
    setTimeout(()=>{
        res.json(products)
    },5000)    
})

app.get("/heroes",(req,res)=>{
    setTimeout(()=>{
        res.json(heroes)
    },2000)    
})

app.get("/",function(req,res){
    res.render('aboutus')
})
app.post("/authenticateuser",(req,res)=>{
    console.log(userdata)
    var x = userdata.find((u)=>{
        if(u.username===req.body.username && u.password===req.body.password){
            return true
        }
    })
    if(x){
        res.json({message:'authenticuser',user:x})
    }
    else{
        res.json({message:'notauthentic'})
    }
        
})
app.get("/grid/:x",(req,res)=>{
    var x = parseInt(req.params.x);
    var startIndex = x*5;
    var endIndex = startIndex+5;
    try{
        if(employees.length===0){
            axios.get("http://dummy.restapiexample.com/api/v1/employees")
            .then((response)=>{        
                employees = response.data.data;
                var data = response.data.data.slice(startIndex,endIndex);
                console.log(data)
                res.render("grid",{layout:false,employees:data})     
            })
            .catch((err)=>{
                console.log(err)
            })
        }
        else{           
            var data = employees.slice(startIndex,endIndex);
            console.log(data)
            res.render("grid",{layout:false,employees:data,p:x-1,q:x+1})
        }
        
    }
    catch{
        console.log("We need more info")
    }
})
app.get("/home/:details",function(req,res){
    console.log(req.params)
    res.render('home',{layout: false,user:JSON.parse(req.params.details)})
})

app.get("/addStudent",(req,res)=>{
    res.sendFile(__dirname+"/public/addStudent.html")
})
app.post("/addStudentData",(req,res)=>{
    console.log("Received post request to addstudentdata",req.body);
    res.redirect("/home")
})
app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/public/login.html");
})
app.post("/validateUser",(req,res)=>{
    console.log("Received post request to validate user",req.body);
    var x = users.find((user)=>{
        if(req.body.username===user.username && req.body.password===user.password){
            return true
        }
    })
    if(x){
        res.redirect("/home/"+JSON.stringify(x))
    }
    else{
        res.redirect("/login")
    }
})
app.listen(9091,()=>{console.log("Server Running on 9091, use http://localhost:9091 on browser to test the app")})