const express = require("express");
const router = express.Router();
const { User, Project } = require("../models");

router.get("/", (req, res) => {
  Project.findAll({
    include: [User],
  }).then((projData) => {
    const hbsProj = projData.map((proj) => proj.toJSON());
    res.render("home", {
      projects: hbsProj,
      loggedIn: req.session.loggedIn,
    });
  });
});

router.get("/project/:id", (req, res) => {
  Project.findByPk(req.params.id, {
    include: [User],
  }).then((proj) => {
    hbsData = proj.toJSON();
    hbsData.loggedIn = req.session.loggedIn;
    res.render("project", hbsData);
  });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/profile");
  }
  res.render("login", {
    loggedIn: false,
  });
});

router.get("/profile", (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect("/login");
  }
  User.findByPk(req.session.userId, {
    include: [Project],
  }).then((me) => {
    const hbsData = me.toJSON();
    hbsData.loggedIn = true;
    res.render("profile", hbsData);
  });
});

module.exports = router;
