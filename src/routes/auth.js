const router = require("express").Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const isUserAlreadyExist = await User.findOne({ email: req.body.emai });

    if (isUserAlreadyExist) return res.status(400).send("Email already exists");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    });

    const savedUser = await user.save();
    console.log("savedUser", savedUser);
    res.send(savedUser);
  } catch (e) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send("Invalid Email or Password");

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordMatch)
      return res.status(400).send("Invalid Email or Password");
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header("auth-token", token).send(token);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
