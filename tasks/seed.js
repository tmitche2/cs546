const dbConnection = require("../data/connection");
const data = require("../data/");
const drinks = data.drinks;
const users = data.users;

dbConnection().then(
  db => {
    return db
      .dropDatabase()
      .then(() => {
        return dbConnection;
      })
      //adds Dylan to database
      .then(db => {
        return users.create("DylanD", "password", 21);
      })

      //Adds Moscow Mule under Dylan's profile
      .then(Dylan => {
        const id = Dylan._id;

        return drinks
          .create("Moscow Mule", "Strong", "Sweet",
          ["Vodka"], ["Ginger beer", "lime juice", "ice"],
          "Spoon", "Copper Mug", "Combine 4 oz Ginger beer, 1 1/2 oz Vodka, and 1/6 oz Lime juice in mug with ice. Stir to combine",
          "Medium", 4)

          .then(() => {
            return drinks.create();
          })

          .then(() => {
            return drinks.create();
          });
      })

      .then(() => {
        console.log("Done seeding database");
        db.close();
      });
  },
  error => {
    console.error(error);
  }
);
