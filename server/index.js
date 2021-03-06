const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// import cors from "cors";
const passport = require("passport");
const path = require("path");
require('dotenv').config();

// Passport
// import "./middleware/passport";
const fireStart = require("./middleware/passport");

//Routes
const  UserRoutes = require( "./routes/User");
const  AuthRoutes = require( "./routes/Auth");
const  TransactionRoutes = require( "./routes/Transcations");

const { MONGOURL } = process.env;

// MongoDB Connection
mongoose.connect(
  MONGOURL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (error) {
      console.log("Cannot connect to MONGODB");
      throw error;
    }
  }
);

const app = express();
app.use(bodyParser.json({ type: "application/json" }));
// app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(passport.initialize());

// Listen to routes
app.use("/auth", AuthRoutes);
app.use("/user", passport.authenticate("jwt", { session: false }), UserRoutes);
app.use(
  "/transaction",
  passport.authenticate("jwt", { session: false }),
  TransactionRoutes
);

// For production
if (process.env.NODE_ENV === "production") {
  //Set static folder
  app.use(express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sever Started on ${PORT}`));

/**
 * MONGOURL=mongodb://localhost:27017/money_user
 */
