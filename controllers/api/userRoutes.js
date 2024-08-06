const router = require("express").Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

//signup
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.userId = userData.id;
    req.session.loggedIn = true;
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(401)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userData.password
    );

    if (!validPassword) {
      res
        .status(401)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.userId = userData.id;
    req.session.loggedIn = true;

    res.json({ user: userData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//logout
router.delete("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
