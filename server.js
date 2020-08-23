const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const port = 5000;

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.json());

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static("public"));

//Connect to the mongodb database
mongoose.connect("mongodb://localhost:27017/tmysDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));

//Mongoose schema for storing users secrets
const secretSchema = new mongoose.Schema({
  secret: String,
});

//Initialize the Schema
const Secret = mongoose.model("Secret", secretSchema);

//Root route at "/"
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});

// app.post("/", urlencodedParser, (req, res) => {
//   const test = new Secret({ secret: req.body.secret });
//   test.save((err) => {
//     if (err) return console.log(err);
//   });
//   // Redirects to page "/all" to show all the secrets submitted by the user
//   res.redirect("/all");
// });
// gets data from the react
app.post("/api", (req, res) => {
  const test = new Secret({ secret: req.body.value });
  test.save((err) => {
    if (err) return console.log(err);
  });
  res.status(200).json();
});

//Route where all the secrets are displayed.
app.get("/all", (req, res) => {
  Secret.find((err, secrets) => {
    if (err) console.log(err);
    res.send(secrets);
  });
});

app.listen(port, (req, res) => {
  console.log(`Successfully conncted on port ${port}`);
});
