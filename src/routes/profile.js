const router = require("express").Router();
const User = require("../model/User");
const verify = require("../middleware/verifyToken");

router.get("/profile", verify, async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  res.send(user);
});

module.exports = router;
