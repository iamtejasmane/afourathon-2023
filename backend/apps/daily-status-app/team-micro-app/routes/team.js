const express = require("express")
const utils = require("../utils/utils")

const { Teams, Employees } = require("../../../db-server/db/db-mysql")

const router = express.Router()

// get all the temas created by employee
// id: the id of the employee
// use project_id as query parameter e.g. http://localhost:8012/teams/10?project_id=1
router.get("/teams/:id", async (req, res) => {
  const emp_id = req.params.id
  const project_id = req.query.project_id

  let employee = await Employees.findByPk(emp_id)

  // check if the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && employee["role"] > 3) { // for role based access
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
      message: "Permission denied!",
    })
  }
})

// create team within a project
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
    team_members_emp_id_list,
  } = req.body

  // get employee
  const employee = await Employees.findByPk(emp_id)
  let err = {}
  // check if the employee the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && employee["role"] > 3) { // for role based access
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
      .then(async (team) => {
        console.log(team)
        // console.log(team_members_emp_id_list.length)
        // get emp
        for (i = 0; i < team_members_emp_id_list.length; i++) {
          const employee_id = team_members_emp_id_list[i]
          const employee = await Employees.findByPk(employee_id)

          if (employee["team_id"] == null) {
            console.log(
              `${employee.first_name} is added to team ${team.team_name}`.green
            )
            await employee.update({ team_id: team["team_id"] })
          } else {
            err = {
              status: "error",
              error: "Employee is already allocated to team",
              data: [],
            }
            err.data.push(employee)
          }
        }
        if (err["status"] == "error") {
          res.send(utils.createResult(err, null))
        } else {
          res.send(utils.createResult(null, team))
        }
      })
      .catch((err) => {
        console.log("error :".red + err)
        res.send(utils.createResult(err, null))
      })
  } else {
    res.status(404).json({
      status: "error",
      message: "Permission denied!",
    })
  }
})

// update team information api
// id: team id to be updated
router.put("/teams/:id", (req, res) => {
  const team_id = req.params.id

  Teams.findByPk(team_id)
    .then(async (team) => {
      await team.update(req.body)
    })
    .then((team) => {
      res.send(utils.createResult(null, team))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete team by id
// to delete a team it required to unbind the employee object first.
router.delete("/teams/:id", async (req, res) => {
  const team_id = req.params.id

  // unbinding employees
  const employees = await Employees.update(
    { team_id: null },
    { where: { team_id: team_id } }
  )

  if (!employees) {
    console.log("employee not found!".red)
  }
  // delete team
  Teams.findByPk(team_id)
    .then((team) => {
      team.destroy()
    })
    .then((team) => {
      res.send(utils.createResult(null, team))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

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

module.exports = router
