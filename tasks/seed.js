const dbConnection = require("../data/connection");
const drinks = require("../data/drinks");
const drinkListFile = require("../data/drinkList");
const drinkList = drinkListFile.drinkList;
const users = require("../data/users");
const userListFile = require("../data/userList");
const userList = userListFile.userList;

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();

  // Seed drinks
  console.log("Seeding drinks");
  for (let i = 0; i < drinkList.length; i++){
    const obj = drinkList[i];
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

  // Seed users
  console.log("Seeding users");
  for (let i = 0; i < userList.length; i++) {
    const user = userList[i];
    const username = user.username;
    const password = user.password;
    const age = user.age;
    await users.create(username, password, age);
  }

  console.log("Done seeding database");
  await db.serverConfig.close();
  return;
}

main().catch(console.log);