const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Project extends Model {}

Project.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    neededFunding: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Project;
