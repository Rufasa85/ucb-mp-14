const User = require("./User");
const Project = require("./Project");

User.hasMany(Project, {
  onDelete: "CASCADE",
});

Project.belongsTo(User);

module.exports = {
  User,
  Project,
};
