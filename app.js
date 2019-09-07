const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./src/routes/auth");
const profileRoute = require("./src/routes/profile");
const streamRoute = require("./src/routes/stream");
dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
    console.log("connected to db")
  )
  .catch(error => console.log(error)); //TODO handle db connecting error;

app.use(cors());
app.use(express.json());
app.use("/api/user", authRoute);
app.use("/api/user", profileRoute);
app.use("/api/user", streamRoute);

app.listen(3001, () => console.log(`server is running on http:localhost:3001`));

// {
// 	"email":"jordan@test.com",
// 	"password": "144352"
// }
