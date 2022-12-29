const express = require("express")
const utils = require("../utils/utils")

const { Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// this is the middleware to check whether
// the user has admin permission or not

// router.use(function (req, res, next) {
//   const { id } = req.params
//   console.log(id)
//   console.log(req.url)
//   const employee = Employees.findOne({ where: { emp_id: id } })

//   console.log("heree".red)
//   console.log(employee.is_admin)
//   if (employee.is_admin == true) {
//     next()
//   } else {
//     res.status(403).send({
//       status: "error",
//       message: "You don't have permissions",
//     })
//   }
// })

// get all the employees
// router.get("/admin/:id", async (req, res) => {
//   Employees.findAll()
//     .then((employees) => {
//       res.send(utils.createResult(null, employees))
//     })
//     .catch((err) => {
//       res.send(utils.createResult(err, null))
//     })
// })

// get all employees information
// id : admin's id
router.get("/admin/:id", (req, res) => {
  const { id } = req.params
  console.log(id)

  Employees.findByPk(id).then((employee) => {
    console.log(employee)
    if (employee.is_admin == true) {
      Employees.findAll()
        .then((employees) => {
          res.send(utils.createResult(null, employees))
        })
        .catch((err) => {
          res.send(utils.createResult(err, null))
        })
    } else {
      res.status(404).json({
        status: "error",
        error: "You don't have permissions",
      })
    }
  })
})

// update role and designation of an employee.
// id: admin emp_id & is_admin checks.
// emp_id: ID of the employee to be updated.
router.put("/admin/:id", (req, res) => {
  const { id } = req.params
  const { role, designation, emp_id } = req.body

  Employees.findByPk(id).then((employee) => {
    if (employee.is_admin == true) {
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
    } else {
      res.status(404).json({
        status: "error",
        error: "You don't have permissions",
      })
    }
  })
})

// delete an employee record
// id: admin's employee id for checks.
// emp_id: employee id to be deleted
router.delete("/admin/:id", (req, res) => {
  const { emp_id } = req.body

  Employees.findByPk(emp_id)
    .then((employee) => {
      employee.destory()
    })
    .then((employee) => {
      res.send(utils.createResult(null, employee))
    })
    .catch((error) => {
      res.send(utils.createResult(error, null))
    })
})

module.exports = router
