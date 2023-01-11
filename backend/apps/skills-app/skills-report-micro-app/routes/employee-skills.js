const express = require("express")
const utils = require("../utils/utils")

const { SkillsMappings, Employees } = require("../db/db-mysql")

const router = express.Router()

// get all employess of specific skills
// skill_name: required query parameter
router.get("/employee-skills", async (req, res) => {
  const skill_name = req.query.skill_name

  SkillsMappings.findAll({ where: { skill_name: skill_name } })
    .then(async (mappings) => {
      let employees = []
      try {
        for (i = 0; i < mappings.length; i++) {
          const employee = await Employees.findByPk(mappings[i].emp_id)
          employees.push(employee)
        }
        res.send(utils.createResult(null, employees))
      } catch (err) {
        res.send(utils.createResult(err, null))
      }
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

module.exports = router
