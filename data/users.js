const collections = require("./collections");
const users = collections.users;
const bcrypt = require("bcrypt");

// Create a new user (don't supply drinks bc a new user would have no drinks)
async function create(username, password, age) {
    if (!username || typeof username !== "string") throw "You must supply a username";
    if (!passwor || typeof password !== "string") throw "You must supply a password";
    if (!age || typeof age !== "number") throw "You must supply the user's age";
    
    // TODO: Hash password
    // TODO: What if they're < 21?

    // Create new user
    let newUser = {
        username: username,
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

module.exports = {
    create,
    getUsers,
    get
};