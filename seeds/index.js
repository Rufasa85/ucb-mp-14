const sequelize = require("../config/connection");
const { User, Project } = require("../models");

const userData = [
  {
    name: "catfan123",
    email: "joe@joe.joe",
    password: "password",
  },
  {
    name: "dogPerson12",
    email: "steve@joe.joe",
    password: "password1",
  },
];

const projectData = [
  {
    name: "cat cafe",
    description: "for me alone",
    neededFunding: 25000000,
    UserId: 1,
  },
  {
    name: "second cat cafe",
    description: "for me and my waiiiffeee",
    neededFunding: 2500000000000,
    UserId: 1,
  },
  {
    name: "dog park",
    description:
      "not like you think, its like a parking lot for dogs, like outside of places they shouldnt be. like the grocery store.",
    neededFunding: 1200,
    UserId: 2,
  },
  {
    name: "dog daycare",
    description: "Its a daycare for humans, run by dogs.",
    neededFunding: 10,
    UserId: 2,
  },
];

const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
    });
    await Project.bulkCreate(projectData);
    console.log("yay");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedMe();
