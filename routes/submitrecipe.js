const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/users");

router.post("/", (req, res) => {
    const info = req.body;
    //console.log("FUCKing hell");
    if(!info.drinkName){
        res.render("layouts/loginError",{error:"No name given"});
        return 1;
    }
    /* if(!info.difficulty){
        res.render("layouts/loginError",{error:"No difficulty given"});
        return 1;
    } */
    if(!info.flavor){
        res.render("layouts/loginError",{error:"No flavor given"});
        return 1;
    }
    if(!info.alcoholTypes){
        res.render("layouts/loginError",{error:"No alcohols given"});
        return 1;
    }
    if(!info.ingredients){
        res.render("layouts/loginError",{error:"No ingredients given"});
        return 1;
    }
    if(!info.tools){
        res.render("layouts/loginError",{error:"No tools given(Put N/A if there are none)"});
        return 1;
    }
    if(!info.glass){
        res.render("layouts/loginError",{error:"No glass given"});
        return 1;
    }
    /* if(!info.prep){
        res.render("layouts/loginError",{error:"No instructions given"});
        return 1;
    } */
    else{
        res.render("layouts/drink");
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
