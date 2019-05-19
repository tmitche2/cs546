const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../data/users");
const drinks = require("../data/drinks")

router.post("/", async (req, res) => {
    const alcoholTypes = req.body.alcohols;
    const ingredients = req.body.ingredients;
    const difficulty = req.body.difficulty;
    const strength = req.body.strength;
    if(!alcoholTypes){
        res.render("layouts/loginError",{error:"No alcohol given. We only give alcoholic drinks."});
        //check here if broken
        return 1;
    } else {
        let drink = await drinks.filterDrinks(alcoholTypes, ingredients, difficulty, strength); 
        res.render("layouts/drink", {
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
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
