const express = require("express")
const utils = require("../utils/utils")

const { Teams, Projects, Employees } = require("../../../db-server/db/db-mysql")

const router = express.Router()

// This api is for admin users to get all the teams in the database
// router.get("/teams", (req, res) => {
//   Teams.findAll()
//     .then((teams) => {
//       res.send(utils.createResult(null, teams))
//     })
//     .catch((err) => {
//       res.send(utils.createResult(err, null))
//     })
// })

// get all the temas created by employee
router.get("/temas/:id", async (req, res) => {
  const emp_id = req.params.id
  const { project_id } = req.body

  let employee = await Employees.findByPk(emp_id)

  // check if the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && role > 4) { // for role based access
  // if (employee["designation"] == "Project Manager" || employee["designation"] == "Team Lead") { // for role based access

  if (
    employee["designation"] == "Project Manager" ||
    employee["designation"] == "Team Lead"
  ) {
    Teams.findAll({ where: { project_id: project_id } })
      .then((team) => {
        res.send(utils.createResult(null, team))
      })
      .catch((err) => {
        res.send(utils.createResult(err, null))
      })
  } else {
    res.status(404).json({
      status: "error",
      error: "Permission denied!",
    })
  }
})

// create teams api
// id: employee id
router.post("/teams/:id", async (req, res) => {
  const emp_id = req.params.id
  const {
    project_id,
    team_name,
    team_start_dt,
    team_end_dt,
    team_lead_name,
    team_lead_email,
  } = req.body

  // get employee
  const employee = await Employees.findByPk(emp_id)

  // check if the employee the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && role > 4) { // for role based access
  if (
    employee["designation"] == "Project Manager" ||
    employee["designation"] == "Team Lead"
  ) {
    Teams.create({
      project_id: project_id,
      team_name: team_name,
      team_start_dt: team_start_dt,
      team_end_dt: team_end_dt,
      team_lead_name: team_lead_name,
      team_lead_email: team_lead_email,
    })
      .then((teams) => {
        res.send(utils.createResult(null, teams))
      })
      .catch((err) => {
        res.send(utils.createResult(err, null))
      })
  } else {
    res.status(404).json({
      status: "error",
      error: "Permission denied!",
    })
  }
})
