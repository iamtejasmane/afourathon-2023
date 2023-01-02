const express = require("express")
const utils = require("../utils/utils")

const { Projects, Employees } = require("../../../db-server/db/db-mysql")

const router = express.Router()

router.get("/projects", (req, res) => {
  Projects.findAll()
    .then((projects) => {
      res.send(utils.createResult(null, projects))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.get("/projects/:id", (req, res) => {
  const project_id = req.params.id

  Projects.findAll({ where: { project_id: project_id } })
    .then((project) => {
      res.send(utils.createResult(null, project))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.post("/projects/:id", async (req, res) => {
  const emp_id = req.params.id
  const {
    project_name,
    project_start_dt,
    project_end_dt,
    project_manager_name,
    project_manager_email,
  } = req.body

  const employee = await Employees.findByPk(emp_id)

  // check if the employee the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && role > 4) { // for role based access
  if (employee["designation"] == "Project Manager") {
    Projects.create({
      emp_id: emp_id,
      project_name: project_name,
      project_start_dt: project_start_dt,
      project_end_dt: project_end_dt,
      project_manager_name: project_manager_name,
      project_manager_email: project_manager_email,
    })
      .then((projects) => {
        res.send(utils.createResult(null, projects))
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

module.exports = router
