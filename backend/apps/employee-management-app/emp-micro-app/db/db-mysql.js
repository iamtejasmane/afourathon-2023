const Sequelize = require("sequelize")
const colors = require("colors")
require("dotenv").config()

const PORT = process.env.PORT || "3306"
const HOST = process.env.HOST || "127.0.0.1"

colors.enable()

// import table strcuture from the models
const employeeModel = require("../models/employeeModel")
const projectModel = require("../models/projectModel")
const teamModel = require("../models/teamsModel")
const dailyStatusEmailListModel = require("../models/dailyStatusEmailListModel")
const weeklyStatusEmailListModel = require("../models/weeklyStatusEmailListModel")
const dailyStatus = require("../models/dailyStatusModel")
const weeklyStatus = require("../models/weeklyStatusModel")

// a new instance of the Sequelize to access the database
const sequelize = new Sequelize("afourathon", "root", "password", {
  host: HOST,
  port: PORT,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
})

/**
 * If you have multiple servers that you can connect to then you can
 * use read replication instance given below
 */

// const sequelize = new Sequelize('database', null, null, {
//   dialect: 'mysql',
//   port: 3306,
//   replication: {
//     read: [
//       { host: '8.8.8.8', username: 'read-1-username', password: process.env.READ_DB_1_PW },
//       { host: '9.9.9.9', username: 'read-2-username', password: process.env.READ_DB_2_PW }
//     ],
//     write: { host: '1.1.1.1', username: 'write-username', password: process.env.WRITE_DB_PW }
//   },
//   pool: { // If you want to override the options used for the read/write pool you can do so here
//     max: 20,
//     idle: 30000
//   },
// })

/**
 * authenticate the database access and establish a connection
 */

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection established successfully".green)
    console.log(HOST.green + ":".green + PORT.green)
  })
  .catch((error) => {
    console.log("error " + error)
  })

// creates an instance of a table

const Employees = employeeModel(sequelize, Sequelize)
const Projects = projectModel(sequelize, Sequelize)
const Teams = teamModel(sequelize, Sequelize)
const DailyStatusEmails = dailyStatusEmailListModel(sequelize, Sequelize)
const WeeklyStatusEmails = weeklyStatusEmailListModel(sequelize, Sequelize)
const DailyStatus = dailyStatus(sequelize, Sequelize)
const WeeklyStatus = weeklyStatus(sequelize, Sequelize)

// database schema relationships
Employees.hasMany(Projects, { foreignKey: "emp_id" })
Projects.hasMany(Teams, { foreignKey: "project_id" })
Projects.hasMany(DailyStatusEmails, { foreignKey: "project_id" })
Projects.hasMany(WeeklyStatusEmails, { foreignKey: "project_id" })
Employees.hasMany(DailyStatus, { foreignKey: "emp_id" })
Projects.hasMany(WeeklyStatus, { foreignKey: "project_id" })
// synchronize the connection
sequelize.sync({ force: false }).then(() => {
  console.log("Database synced".green)
})

module.exports = {
  Projects: Projects,
  Employees: Employees,
  DailyStatusEmails: DailyStatusEmails,
  WeeklyStatusEmails: WeeklyStatusEmails,
  Teams: Teams,
  DailyStatus: DailyStatus,
  WeeklyStatus: WeeklyStatus,
}
