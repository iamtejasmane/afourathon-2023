const express = require("express")
const utils = require("../utils/utils")

const { Employees, Skills } = require("../db/db-mysql")

const router = express.Router()

// get all skills by domain
// id: domain id
router.get("/skills/:id", async (req, res, next) => {
  const domain_id = req.params.id

  Skills.findAll({ where: { domain_id: domain_id } })
    .then((skills) => {
      res.send(utils.createResult(null, skills))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
// creates skill by admin user
// id: employee id
router.post("/skills/:id", async (req, res, next) => {
  const emp_id = req.params.id
  const { domain_id, skill_name } = req.body

  const employee = await Employees.findByPk(emp_id)

  if (employee["is_admin"] == true) {
    Skills.create({ domain_id: domain_id, skill_name: skill_name })
      .then((skill) => {
        res.send(utils.createResult(null, skill))
      })
      .catch((err) => {
        res.send(utils.createResult(err, null))
      })
  } else {
    res.status(401).json({
      status: "error",
      message: "Permission denied!",
    })
  }
})

// update skill
// id: skill id
router.put("/skills/:id", async (req, res, next) => {
  const skill_id = req.params.id
  Skills.findByPk(skill_id)
    .then(async (skill) => {
      await skill.update(req.body)
    })
    .then((skill) => {
      res.send(utils.createResult(null, skill))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete skill
// id: skill id
router.delete("/skills/:id", async (req, res, next) => {
  const skill_id = req.params.id
  Skills.findByPk(skill_id)
    .then(async (skill) => {
      await skill.destroy()
    })
    .then((skill) => {
      res.send(utils.createResult(null, skill))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
module.exports = router
