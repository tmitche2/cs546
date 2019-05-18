const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/users");

router.post("/", (req, res) => {
    const info = req.body;
    //console.log("FUCKing hell");
    if(!info.alcohols){
        //errors if there is no username given
        res.render("layouts/loginError",{error:"No alcohol given. We only give alcoholic drinks."});
        //check here if broken
        return 1;
    }
    else{
        res.render("layouts/drink");
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
