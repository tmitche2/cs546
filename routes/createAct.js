const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/users");

router.post("/", (req, res) => {
    const info = req.body;
    //console.log("FUCKing hell");
    if(!info.name){
        //errors if there is no username given
        res.render("layouts/loginError",{error:"No username given"});
        //check here if broken
        return 1;
    }
    if(!info.password){
        //errors if there is no password given
        res.render("layouts/loginError",{error:"No password given"});
        return 1;
    }
    if(!info.password2){
        //errors if there is no password given
        res.render("layouts/loginError",{error:"Need to comfirm password"});
        return 1;
    }
    if(info.password != info.password2){
        //errors if there is no password given
        res.render("layouts/loginError",{error:"Passwords do not match"});
        return 1;
    }
    if(!info.age){
        //errors if there is no password given
        res.render("layouts/loginError",{error:"You must give an age"});
        return 1;
    }
    if(info.age<21){
        //errors if under 21
        res.render("layouts/loginError",{error:"You're under 21, child. You can't make an account!"});
        return 1;
    }
    else{
        res.render("layouts/submitRecipe");
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
