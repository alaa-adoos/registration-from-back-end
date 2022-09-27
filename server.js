require("dotenv").config();
const cors=require("cors");
const express=require("express");
const server=express();
const mongoose=require("mongoose");
server.use(cors());
server.use(express.json());

// mongoose.connect('mongodb://localhost:27017/Form', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://ALAA:000@ac-k3xv9zl-shard-00-00.j1ydgtg.mongodb.net:27017,ac-k3xv9zl-shard-00-01.j1ydgtg.mongodb.net:27017,ac-k3xv9zl-shard-00-02.j1ydgtg.mongodb.net:27017/?ssl=true&replicaSet=atlas-bul72z-shard-0&authSource=admin&retryWrites=true&w=majority')
const formSchema=new mongoose.Schema({
    email:{type:String,required:true,unique:true },
    password:{type:String ,required:true}
})

const formModal=mongoose.model('logins',formSchema);

async function seedData(){

    const first= new formModal({
 
email:"alaa@yahoo.com",

   password:"1234"
  
    })
    await first.save();
}
// seedData();


const PORT=process.env.PORT;

//Home http://localhost:3000

server.get('/',(req,res)=>{
    res.send("hello from home route");
})

 
server.get("/form",addForm);
server.post("/form",addFormHandler)
server.post("/addInfo",addInfoHandler);





async function addInfoHandler(req,res){
    const{email,password}=req.body;
    await formModal.create({email:email,password:password},(err,result)=>{
        if(err){
            console.log(err);
        }
        else
        {
            res.json(result);
        }
    })
}


 async function addFormHandler(req,res){

    const{email, password}=req.body;
  
    formModal.findOne({email:email,password:password},(err,result)=>{
        if(err)
        {
            console.log(err);
  
        }
        else
       {
        
        res.json(result);
       }
    })
}





function addForm(req,res){
  formModal.find({},(err,result)=>{
        if(err)
        {
            console.log(err);
  
        }
        else
       {
        
        res.json(result);
       }
    })
}





server.listen(PORT,()=>{
    console.log(`I am ${PORT} port`);
})