const collections = require("./collections");
const drinks = collections.drinks;

// Allow a user to create a new drink
async function createDrink(drinkName, strength, flavor, alcoholTypes, ingredients, tools, glassType, prepInfo, difficulty, rating) {
    // Check inputs
    if (!drinkName || typeof drinkName !== "string") throw "You must provide a name for the drink";
    if (!strength || typeof strength !== "string") throw "You must provide a strength level for the drink";
    if (!flavor || typeof flavor !== "string") throw "You must provide a flavor for the drink";
    if (!alcoholTypes || typeof alcoholTypes !== "string") throw "You must provide a list of the alcohol in the drink";
    if (!ingredients || typeof ingredients !== "string") throw "You must provide a list of the non-alcoholic ingredients for the drink";
    if (!tools || typeof tools !== "string") throw "You must provide a list of any tools you need to make the drink";
    if (!glassType || typeof glassType !== "string") throw "You must provide the type of glass used for the drink";
    if (!prepInfo || typeof strength !== "string") throw "You must provide the instructions to make the drink";
    if (!difficulty || typeof strength !== "string") throw "You must provide a difficulty level for the drink";
    if (!rating || typeof rating !== "number") throw "You must provide a rating for this drink (on a scale of 1-5)";

    // Convert alocoholTypes, ingredients, and tools into lists
    let alcoholList = alcoholTypes.split(", ");
    let ingredientList = ingredients.split(", ");
    let toolList = tools.split(", ");
    
    // Create a new drink
    let newDrink = {
        drinkName: drinkName,
        strength: strength,
        flavor: flavor,
        alcoholTypes: alcoholList,
        ingredients: ingredientList,
        tools: toolList,
        glassType: glassType,
        prepInfo: prepInfo,
        difficulty: difficulty,
        rating: rating
    };

    // Get drink collection
    const drinkCollection = await drinks();
    // Insert the drink into the mongo collection
    const insertedDrink = await drinkCollection.insertOne(newDrink);
    if (insertedDrink.insertedCount === 0) throw `Could not add ${drinkName}`;
    const drink = await this.get(insertedDrink.insertedId);
    // TODO: add drink to user
    return drink;
}

// Get an array of all the drinks
async function getAllDrinks() {
    const drinkCollection = await drinks();
    const drinkArray = await drinkCollection.find({}).toArray();
    return drinkArray;
}

// Get a drink by its drink name
async function getDrink(drinkName) {
    if (!drinkName) throw "You must provide the name of a drink";
    const drinkCollection = await drinks();
    const drink = await drinkCollection.findOne({ _drinkName: drinkName });
    if (!drink) throw `No drink found with name ${drinkName}`;
    return drink; 
}

async function filterDrinks(alcoholList, ingredients, difficulty, strength) {
    const drinkCollection = await drinks();
    //returns list of drinks that match input parameters
    const drinksList = await drinkCollection.find(
        {$and:[
            { _alcoholTypes: alcoholList },
            { _ingredients: ingredients },
            { _difficulty: difficulty },
            { _strength: strength }
        ]}).toArray();

    if (!drinksList){
        return 0;
    }
    else{
        return drinksList; 
    } 
}

module.exports = {
    createDrink,
    getAllDrinks,
    getDrink,
    filterDrinks
};