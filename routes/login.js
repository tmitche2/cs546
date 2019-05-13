const express = require("express");
const router = express.Router();
const data = require("../data");
const bcrypt = require("bcryptjs");

router.post("/", (req,res)=>{

    const info = req.body;
    if(!info.username){
        //errors if there is no username given
        res.render("login/error",{title:"Login",error:"empty username"});
        //check here if broken
        return 1;
    }

    if(!info.password){
        //errors if there is no password given
        res.render("login/error",{title:"Login",error:"empty password"});
        return 1;
    }

    let user = data.filter(function(user){
        return user.username === info.username;
    });
    
    if(user[0]!= undefined && bcrypt.compareSync(info.password, user[0].hashedPassword)){
        //checks the password against the hashed password, and searches for user
        //password correct
        let newUser = {...user[0]}
        delete newUser.hashedPassword;
        delete newUser.Password;
        req.session.user = newUser;
        res.redirect("/private");
    }else{
        //username or password was incorrect
        res.render("login/error",{error:"username or password error",title:"login"});
    }
});

router.get("*",(req,res)=>{
    res.redirect("/");
});
module.exports = router;