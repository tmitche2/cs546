const express = require("express");
const router = express.Router();
const drinks = require("../data/drinks")

router.post("/", async (req, res) => {
    const alcoholTypes = req.body.alcohols;
    const ingredients = req.body.ingredients;
    const difficulty = req.body.difficulty;
    const strength = req.body.strength;
    console.log("I got here 1");
    if(!alcoholTypes){
        res.render("layouts/loginError",{error:"No alcohol given. We only give alcoholic drinks."});
        //check here if broken
        return 1;
    } else {
        console.log("I got here 2");
        try {
            console.log("I got here 3");
            let drinkList = await drinks.filterDrinks(alcoholTypes, ingredients, difficulty, strength);
            const topResult = drinkList.shift();
            

            console.log(`${drinkList}`);

            res.render("layouts/drink", {
                drinkName: topResult.drinkName,
                strength: topResult.strength,
                flavor: topResult.flavor,
                alcoholTypes: topResult.alcoholList,
                ingredients: topResult.ingredientList,
                tools: topResult.toolList,
                glassType: topResult.glassType,
                prepInfo: topResult.prepInfo,
                difficulty: topResult.difficulty,
                rating: topResult.rating
            });
            console.log("I got here 5");
        } catch (error) {
            res.render("layouts/drinkNotFound", {error:"Couldn't find drinks"});
            return 1; 
        }
        
        console.log("I got here 6");

        
    }
});
router.get("*", (req,res)=>{
    res.render("layouts/submitRecipe");
});
module.exports=router;
