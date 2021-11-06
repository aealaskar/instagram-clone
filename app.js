const express = require("express");
const connectDB = require("./db/database");
const cors = require("cors");
const userRoutes = require("./apis/users/user.routes");
const errorHandler = require("./middleware/errorHandler");
const { localStrategy, jwtStrategy } = require("./middleware/passport");
const passport = require("passport");
const path = require("path");

const app = express();

connectDB();

app.use(express.json());
app.use("/media", express.static(path.join(__dirname, "media")));
app.use(cors());
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/api/", userRoutes);

//Middleware
app.use(errorHandler);

const PORT = 8000;
app.listen(PORT, () =>
  console.log(`Application running on localhost: ${PORT}`)
);
