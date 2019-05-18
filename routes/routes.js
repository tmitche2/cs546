// Server routes
const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks");
const users = require("../data/users");
const bcrypt = require("bcrypt");

// post a new login attemp
router.post("/login", async (req, res) => {
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

// get private page
router.get("/private", (req, res) => {
    if(req.session.user){
        res.render("login/private",{title:"User Info",user:req.session.user});
    }else{
        res.render("login/error",{error:"please login",title:"Error"});
    }
});

// post a new drink
router.post("/addDrink", async (req, res) => {
    let drinkData = req.body;
    // Error checking would be here, assuming drinks.create() covers it rn
    try {
        const newDrink = await drinks.createDrink(
            drinkData.drinkName,
            drinkData.strength,
            drinkData.flavor,
            drinkData.alcoholTypes,
            drinkData.ingredients,
            drinkData.tools,
            drinkData.glassType,
            drinkData.prepInfo,
            drinkData.difficulty,
            drinkData.rating
        );
        res.redirect(`/drinks/${newDrink._id}`);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// Search for a drink
router.post("/search", async (req, res) => {
    let alcoholTypes = req.body.alcohols;
    let ingredients = req.body.ingredients;
    let strength = req.body.strength; // Check parameter name once handlebars has been updated
    let result = await drinks.filterDrinks(alcoholTypes, ingredients, strength); // Change to Naseem's function name
    if (result !== 0) { // Change to whatever Naseem's function returns when nothing found
        res.redirect(`/drinks/${result}`);
    } else {
        res.render("../views/drinkNotFound");
    }
});

// Get drink display page
router.get("/drink/:id", async (req, res) => {
    // Get drink by using getDrink(id)
    // Pass it to handlebars page
    const drink = await drinks.getDrink(req.params.id);
    res.render("../views/drink", {
        drinkName: drink.drinkName,
        strength: drink.strength,
        flavor: drink.flavor,
        alcoholTypes: drink.alcoholList,
        ingredients: drink.ingredientList,
        tools: drink.toolList,
        glassType: drink.glassType,
        prepInfo: drink.prepInfo,
        difficulty: drink.difficulty,
        rating: drink.rating
    });
});

// get log out request
router.get("/logout", (req, res) => {
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