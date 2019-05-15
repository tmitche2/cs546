// Server routes
const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks");
const users = require("../data/users");
const bcrypt = require("bcrypt");

// POST /login
router.post("/login", async (req,res)=>{
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

    let passwordTruth = await bcrypt.compare(info.password, user[0].hashedPassword);
    
    if(user[0]!= undefined && passwordTruth){
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

// GET /private
router.get("/private",(req,res) =>{
    if(req.session.user){
        res.render("login/private",{title:"User Info",user:req.session.user});
    }else{
        res.render("login/error",{error:"please login",title:"Error"});
    }
});

// GET /logout
router.get("/logout", (req,res)=>{
    req.session.destroy();
    res.redirect("/login");
});

// Constructor
const constructorMethod = app => {
    app.use("/", router);
    app.use("*", (req, res) => {
        res.status(404);
    });
};

module.exports = constructorMethod;