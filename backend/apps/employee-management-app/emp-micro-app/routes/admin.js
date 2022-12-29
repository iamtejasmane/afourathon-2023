const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// this is the middleware to check whether
// the user has admin permission or not

router.use(async (req, res, next) => {
  const { id } = req.params
  const employee = await Employees.findOne({ where: { emp_id: id } })

  if (employee.is_admin == true) {
    next()
  } else {
    res.status(403).send({
      status: "error",
      message: "You don't have permissions",
    })
  }
})

// get all the employees
router.get("/admin/:id", async (req, res) => {
  Employees.findAll()
    .then((employees) => {
      res.send(utils.createResult(null, employees))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// router.get("/employees/:id", (req, res) => {
//   const { id } = req.params
//   Employees.findOne({ emp_id: id }).then((employee) => {
//     if (employee.is_admin === true) {
//       Employees.findAll()
//         .then((employees) => {
//           res.send(utils.createResult(null, employees))
//         })
//         .catch((err) => {
//           res.send(utils.createResult(err, null))
//         })
//     } else {
//       res.status(404).json({
//         status: "error",
//         error: "Unauthorized request",
//       })
//     }
//   })
// })

// update role and designation of an employee
router.put("/admin/:id", (req, res) => {
  const { role, designation, emp_id } = req.body

  Employees.findByPk(emp_id)
    .then((employee) => {
      employee.update({
        role: role,
        designation: designation,
      })
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete an employee record
router.delete("/admin/:id", (req, res) => {
  Employees.findByPk(req.params.id)
    .then((employee) => {
      Employees.destory()
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((error) => {
      res.send(utils.createResult(error, null))
    })
})

module.exports = router
