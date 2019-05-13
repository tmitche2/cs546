const express = require("express");
const router = express.Router();
const data = require("../data");

router.get("/",(req,res) =>{
    if(req.session.user){
        res.render("login/private",{title:"User Info",user:req.session.user});
    }else{
        res.render("login/error",{error:"please login",title:"Error"});
    }
});

module.exports = router;