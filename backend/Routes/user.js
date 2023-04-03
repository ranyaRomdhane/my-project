const express=require("express");
const User = require("../Models/user");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const {loginRules,registerRules,validation} = require("../middleware/validator");
const isAuth=require("../middleware/passport");


  
// register 

router.post("/register",registerRules(),validation, async(req,res) => {
 const {name,lastname,email,password} = req.body;
 try {
   const newUser =new User({name,lastname,email,password});


// check if email exist
 
const searchesUser = await User.findOne({ email});
if (searchesUser) {
    return res.status(400).send({ msg: "email exist" });
}


   // hash password

const salt= 10;
const genSalt = await bycrypt.genSalt(salt);
const hashedPassword = await bycrypt.hash(password, genSalt);
console.log(hashedPassword);
newUser.password = hashedPassword;
 

   //save the user 

const newUserToken= await newUser.save();
//gerated token
const payload= {
    _id: newUserToken._id,
    name : newUserToken.name,
}
const token = await jwt.sign(payload, process.env.secretOrkey, {
    expiresIn: 3600,
});
   res.status(200).send({newUserToken, msg : "user is saved", token:` Bearer ${token}`});
 } catch (error) {
res.send(error)
 }
});

 
//login 

router.post("/login" ,loginRules(),validation, async(req,res) => {
    const {email, password}=req.body;
    try {


        //find if the user exist 

const searchesUser = await User.findOne({email});



        //if the email not exist 
        
        if (!searchesUser){
            return res.status(400).send({msg: "bad credential"});
        }


        //password are equals

        const match= await bycrypt.compare(password, searchesUser.password);
        if (!match){
return res.status(400).send({msg:"bad credential"});
}

//cree un token

const payload = {
    _id : searchesUser._id,
    name: searchesUser.name,
};
const token =await jwt.sign(payload, process.env.secretOrkey, {
    expiresIn: 3600,
});



         //send the user

res.status(200).send({ user: searchesUser, msg: "succes", token: `Bearer ${token}` });


    } catch (error) {
        res.status(500),send({msg: " can not get the user"});
    } 
});
 






//get all  users

router.get("/",async (req,res)=> { 
    try {
      let result =await User.find();
      res.send({ users :result, msg: "all users"});
    } catch (error) {
        console.log(error)
    }
});

//get current user


router.get("/current", isAuth(),(req,res)=>
{
    res.status(200).send({ user : req.user });
});



module.exports= router; 