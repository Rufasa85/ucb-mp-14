const router = require("express").Router();
const { Project } = require("../../models");

router.post("/", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "login first to create a project" });
  }
  try {
    const newProject = await Project.create({
      ...req.body,
      UserId: req.session.userId,
    });

    res.status(200).json(newProject);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.session.loggedIn) {
    return res.status(401).json({ msg: "login first to create a project" });
  }
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    });

    if (!projectData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(projectData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
