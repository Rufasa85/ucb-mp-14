const express = require("express");
const router = express.Router();

const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

const projectRoutes = require("./projectRoutes");
router.use("/projects", projectRoutes);

module.exports = router;
