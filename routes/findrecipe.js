const express = require("express");
const router = express.Router();
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
        try {
            let drinkList = await drinks.filterDrinks(alcoholTypes, ingredients, difficulty, strength);
            const topResult = drinkList.shift();

            res.render("layouts/drink", {
                drinkName: topResult.drinkName,
                strength: topResult.strength,
                flavor: topResult.flavor,
                alcoholTypes: topResult.alcoholTypes,
                ingredients: topResult.ingredients,
                tools: topResult.tools,
                glassType: topResult.glassType,
                prepInfo: topResult.prepInfo,
                difficulty: topResult.difficulty,
                rating: topResult.rating
            });
        } catch (error) {
            res.render("layouts/drinkNotFound", {error:"Couldn't find drinks"});
            return 1; 
        }        
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/mainPage");
});
module.exports=router;
