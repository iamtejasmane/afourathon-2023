const express = require("express")
const utils = require("../utils/utils")

const { Projects, Employees } = require("../../../db-server/db/db-mysql")

const router = express.Router()

// This api is for admin users to get all the projects in the database
// router.get("/projects", (req, res) => {
//   Projects.findAll()
//     .then((projects) => {
//       res.send(utils.createResult(null, projects))
//     })
//     .catch((err) => {
//       res.send(utils.createResult(err, null))
//     })
// })

// get all the projects created by employee
router.get("/projects/:id", async (req, res) => {
  const emp_id = req.params.id

  let employee = await Employees.findByPk(emp_id)
  // employee = JSON.stringify(employee, null, 2)
  console.log(employee)
  // check if the employee has required permissions and role.
  // if (employee["designation"] == "Project Manager" && role > 4) { // for role based access
  if (employee["designation"] == "Project Manager") {
    console.log("here".red)
    Projects.findAll({ where: { emp_id: emp_id } })
      .then((project) => {
        res.send(utils.createResult(null, project))
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

// update project information api
// id: project id to be updated
router.put("/projects/:id", (req, res) => {
  const project_id = req.params.id

  Projects.findByPk(project_id)
    .then(async (employee) => {
      await employee.update(req.body)
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete project by id
router.delete("/projects/:id", (req, res) => {
  const project_id = req.params.id

  Projects.findByPk(project_id)
    .then(async (employee) => {
      await employee.destroy()
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

module.exports = router
