const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");
const profileRoute = require("./src/routes/profile");
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("connected to db")
);

app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api", profileRoute);

app.listen(3000, () => console.log(`server is running on http:localhost:3000`));

// {
// 	"email":"jordan@test.com",
// 	"password": "144352"
// }
