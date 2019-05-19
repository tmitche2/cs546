const dbConnection = require("../data/connection");
const drinks = require("../data/drinks");
const drinkListFile = require("../data/drinkList");
const drinkList = drinkListFile.drinkList;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  for (var i = 0; i < drinkList.length; i++){
    var obj = drinkList[i];
    const drinkName = obj.drinkName;
    const strength = obj.strength;
    const flavor = obj.flavor;
    const alcoholTypes = obj.alcoholTypes;
    const ingredients = obj.ingredients;
    const tools = obj.tools;
    const glassType = obj.glassType;
    const prepInfo = obj.prepInfo;
    const difficulty = obj.difficulty;
    const rating = obj.rating;
    await drinks.createDrink(drinkName, strength, flavor, alcoholTypes, ingredients, tools, glassType, prepInfo, difficulty, rating);
  }

  console.log("Done seeding database");
  await db.serverConfig.close();
  return;
}

main().catch(console.log);