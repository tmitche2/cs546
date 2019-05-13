// Main setup (based on professor's code)
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const drinks = require("./data/drinks");
const users = require("./data/users");
const statoc = express.static(__dirname + "/public");
const configRoutes = require("./routes");
const exphbs = require("express-handlebars");

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.engine("handlebars", exphbs({ deafultLayout: "main"}));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
    console.log("CHUGG running!");
    console.log("Drink up at http://localhost:3000");
});