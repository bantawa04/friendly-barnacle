import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
// import cors from "cors";
import passport from "passport";
import path from "path";
import "dotenv/config";

// Passport
import "./middleware/passport";

//Routes
import UserRoutes from "./routes/User";
import AuthRoutes from "./routes/Auth";
import TransactionRoutes from "./routes/Transcations";

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
