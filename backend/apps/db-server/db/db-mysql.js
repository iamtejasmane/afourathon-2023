const Sequelize = require("sequelize")
const PORT = process.env.PORT || '3306'

// import table strcuture from the models
const projectModel = require("../../daily-status-app/project-micro-app/models/projectModel")

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
    console.log("Connection established successfully")
  })
  .catch((error) => {
    console.log("error " + error)
  })



// creates an instance of a table

const Projects = projectModel(sequelize, Sequelize) 

// database schema relationships


// synchronize the connection
sequelize.sync({ force: false }).then(() => {
    console.log("Database synced")
  })

module.exports = {
    Projects: Projects
  }
