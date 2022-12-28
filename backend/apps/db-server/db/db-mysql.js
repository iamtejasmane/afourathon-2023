const Sequelize = require("sequelize")
const colors = require("colors")

const PORT = process.env.PORT || "3306"
colors.enable()

// import table strcuture from the models
const projectModel = require("../models/projectModel")
const employeeModel = require("../models/employeeModel")

// a new instance of the Sequelize to access the database
const sequelize = new Sequelize("afourathon", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  port: PORT,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

// authenticate the database access
// and establish a connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully".green)
  })
  .catch((error) => {
    console.log("error " + error)
  })

// creates an instance of a table

const Employees = employeeModel(sequelize, Sequelize)
const Projects = projectModel(sequelize, Sequelize)

// database schema relationships
Employees.hasMany(Projects, { foreignKey: "emp_id" })
Projects.belongsTo(Employees)

// synchronize the connection
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced".green)
})

module.exports = {
  Projects: Projects,
  Employees: Employees,
}
