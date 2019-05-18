// Server routes
const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks");
const users = require("../data/users");
const bcrypt = require("bcrypt");


// Constructor
const constructorMethod = app => {
    app.get("/logout", (req, res) => {
        req.session.destroy();
        res.redirect("/login");
    });
    // Get drink display page
    app.get("/drink/:id", async (req, res) => {
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
    return;
    });

    // Search for a drink
    app.post("/search", async (req, res) => {
        let alcoholTypes = req.body.alcohols;
        let ingredients = req.body.ingredients;
        let difficulty = req.body.difficulty;
        let strength = req.body.strength; // Check parameter name once handlebars has been updated
        let result = await drinks.filterDrinks(alcoholTypes, ingredients, difficulty, strength);
        if (result !== 0) { // Change to whatever Naseem's function returns when nothing found
            res.redirect(`/drinks/${result}`);
        } else {
            res.render("../views/drinkNotFound");
            return;
        }
    });

    // Create a new account
    app.post("/createAccount", async (req, res) => {
        let name = req.body.name;
        let password = req.body.password;
        let age = req.body.age;
        try {
            await users.create(name, password, age);
            res.redirect("/createAccountPage");
        } catch (e) {
            res.status(500).json({ error: e });
            return;
        }

    });

    // post a new drink
    app.post("/addDrink", async (req, res) => {
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
            return;
        }
    });

    app.get("/loginPage", (req, res) =>{
        res.render("layouts/login");
    });

    app.get("/createAccountPage", (req, res) =>{
        res.render("layouts/createAccount");
    });

    app.get("/submitRecipePage", (req, res) =>{
        res.render("layouts/submitRecipe");
    });

    app.use("/", (req, res) => {
        res.render("layouts/search");
        return;
    });

    app.post("/login", async (req, res) => {
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
            return;
        }
    });
    app.use("*", (req, res) => {
        res.status(404);
    });
};

module.exports = constructorMethod;
