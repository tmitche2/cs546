const collections = require("./collections");
const drinks = collections.drinks;

// Allow a user to create a new drink
async function create(drinkName, strength, flavor, alcoholTypes, ingredients, tools, glassType, prepInfo, difficulty, rating) {
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

    // Get drink collection
    const drinkCollection = await drinks();
    // TODO: convert alocoholTypes, ingredients, and tools into lists
    let alcoholList = [alcoholTypes];
    let ingredientList = [ingredients];
    let toolList = [tools];
    
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

    // Insert the drink into the mongo collection
    const insertedDrink = await drinkCollection.insertOne(newDrink);
    if (insertedDrink.insertedCount === 0) throw `Could not add ${drinkName}`;
    
    const drink = await this.get(insertedDrink.insertedId);
    return drink;
}