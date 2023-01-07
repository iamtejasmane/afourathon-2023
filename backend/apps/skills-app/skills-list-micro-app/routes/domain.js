const express = require("express")
const utils = require("../utils/utils")

const { Domains, Employees } = require("../db/db-mysql")

const router = express.Router()

// get all domains
router.get("/domains/:id", async (req, res, next) => {
  const emp_id = req.params.id

  const employee = await Employees.findByPk(emp_id)

  if (employee["is_admin"] == true) {
    Domains.findAll()
      .then((domains) => {
        res.send(utils.createResult(null, domains))
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
// creates domain by admin user
// id: employee id
router.post("/domains/:id", async (req, res, next) => {
  const emp_id = req.params.id
  const { domain_name } = req.body

  const employee = await Employees.findByPk(emp_id)

  if (employee["is_admin"] == true) {
    Domains.create({ domain_name: domain_name })
      .then((domains) => {
        res.send(utils.createResult(null, domains))
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

// update domain
// id: domain id
router.put("/domains/:id", async (req, res, next) => {
  const domain_id = req.params.id
  Domains.findByPk(domain_id)
    .then(async (domain) => {
      await domain.update(req.body)
    })
    .then((domain) => {
      res.send(utils.createResult(null, domain))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete domain by domain id
// id: domain id
router.delete("/domains/:id", async (req, res, next) => {
  const domain_id = req.params.id
  Domains.findByPk(domain_id)
    .then(async (domain) => {
      await domain.destroy()
    })
    .then((domain) => {
      res.send(utils.createResult(null, domain))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
module.exports = router
