const express = require("express")
const utils = require("../utils/utils")

const { Skills, SkillsMappings, Domains } = require("../db/db-mysql")

const router = express.Router()

// get skill of an employee
// id: employee id
router.get("/skill-mappings", async (req, res, next) => {
  SkillsMappings.findAll()
    .then((skills) => {
      res.send(utils.createResult(null, skills))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.get("/skill-mappings/:id", async (req, res, next) => {
  const emp_id = req.params.id

  SkillsMappings.findAll({ where: { emp_id: emp_id } })
    .then((skills) => {
      res.send(utils.createResult(null, skills))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
// create skills
// id: employee id
router.post("/skill-mappings/:id", async (req, res, next) => {
  const emp_id = req.params.id
  const { skill_id, skill_level, years_of_experience } = req.body

  // get skill name and domain name using id's
  const skill = await Skills.findByPk(skill_id)
  const domain = await Domains.findByPk(skill.domain_id)
  SkillsMappings.create({
    emp_id: emp_id,
    skill_name: skill.skill_name,
    domain_name: domain.domain_name,
    skill_level: skill_level,
    years_of_experience: years_of_experience,
  })
    .then((skills) => {
      res.send(utils.createResult(null, skills))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// update skill
// id: employee-skill mapping id
router.put("/skill-mappings/:id", async (req, res, next) => {
  const employee_skills_mapping_id = req.params.id
  const { skill_id } = req.body

  // get skill name and domain name using id's
  const skill = await Skills.findByPk(skill_id)
  const domain = await Domains.findByPk(skill.domain_id)

  SkillsMappings.findByPk(employee_skills_mapping_id)
    .then(async (skill) => {
      await skill.update({
        skill_name: skill.skill_name,
        domain_name: domain.domain_name,
        ...req.body,
      })
    })
    .then((skill) => {
      res.send(utils.createResult(null, skill))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete skills of an employee
// id: employee-skill mapping id
router.delete("/skill-mappings/:id", async (req, res, next) => {
  const employee_skills_mapping_id = req.params.id
  SkillsMappings.findByPk(employee_skills_mapping_id)
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
