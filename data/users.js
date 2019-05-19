const collections = require("./collections");
const users = collections.users;
const bcrypt = require("bcrypt");
const saltRounds = 16;

// Create a new user (don't supply drinks bc a new user would have no drinks)
async function create(username, password, age) {
    if (!username || typeof username !== "string") throw "You must supply a username";
    if (!hashedPassword || typeof hashedPassword !== "string") throw "You must supply a password";
    if (!age || typeof age !== "number") throw "You must supply the user's age";
    
    // TODO: What if they're < 21?

    // Create new user
    let newUser = {
        username: username,
        hashedPassword: await bcrypt.hash(password, saltRounds),
        age: age,
        drinks: []
    };

    // Get the user collection
    const userCollection = await users();
    // Insert the user into the mongo collection
    const insertedUser = await userCollection.insertOne(newUser);
    if (insertedUser.insertedCount === 0) throw `Could not add ${username}`;
    const user = await this.get(insertedUser.insertedId);
    return user;
}

// Get an array of all users
async function getUsers() {
    const userCollection = await users();
    const userArray = await userCollection.find({}).toArray();
    return userArray;
}

// Get one user by their id
async function get(id) {
    if (!id) throw "You must provide an ID";
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (!user) throw `No user found with ID ${id}`;
    return user; 
}

// Get one user by their username
async function getByUsername(un) {
    if (!un) throw "You must provide an ID";
    const userCollection = await users();
    const user = await userCollection.findOne({ username: un });
    if (!user) throw `No user found with username ${un}`;
    return user;
}

// Add a new drink to a user's list of created drinks
async function addDrinkToUser(id, drinkName) {
    if (!id) throw "You must provide an ID value";
    if (!drinkName || typeof drinkName !== "string") throw "You must provide the name of the drink";

    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (user === null) throw `No user with ID ${id}`;

    let updatedUser = {
        _id: user._id,
        username: user.username,
        password: user.password,
        drinks: user.drinks.push(drinkName)
    };

    const updated = await animalCollection.updateOne({ _id: id }, updatedUser);
    if (updated.modifiedCount === 0) throw `Could not update user with ID ${id}`;

    return await this.get(id);
}

module.exports = {
    create,
    getUsers,
    get,
    getByUsername,
    addDrinkToUser
};