const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/users");

router.post("/", async (req, res) => {
    const info = req.body;
    if(!info.login){
        //errors if there is no username given
        res.render("layouts/loginError",{error:"empty username"});
        //check here if broken
        return 1;
    }
    if(!info.password){
        //errors if there is no password given
        res.render("layouts/loginError",{error:"empty password"});
        return 1;
    }
    let userArray = await users.getUsers();
    let user = userArray.filter(user => user.username == info.login);
    const passwordTruth = await bcrypt.compare(info.password, user.hashedPassword);
    if(user !== undefined && passwordTruth){
        //checks the password against the hashed password, and searches for user
        //password correct
        let newUser = user
        delete newUser.hashedPassword;
        delete newUser.Password;
        req.session.user = newUser;
        res.render("layouts/submitRecipe");
    }else{
        //username or password was incorrect
        res.render("layouts/loginError",{error:"username or password error"});
        return;
    }
});
router.get("*", async (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
