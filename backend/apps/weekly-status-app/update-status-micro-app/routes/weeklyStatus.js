const express = require("express")
const utils = require("../utils/utils")

const { WeeklyStatus } = require("../../../db-server/db/db-mysql")
const router = express.Router()

// this api gets the list of daily status of a specific project
// id: project id
router.get("/weekly-status/:id", async (req, res) => {
  const project_id = req.params.id

  WeeklyStatus.findAll({ where: { project_id: project_id } })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// add employee status
// id: employee id
router.post("/weekly-status/:id", async (req, res) => {
  const project_id = req.params.id

  const { highligth, risk, status, week_ending_date } = req.body

  // add date to status
  const date = new Date()

  WeeklyStatus.create({
    project_id: project_id,
    highligth: highligth,
    date: date,
    risk: risk,
    status: status,
    week_ending_date: week_ending_date,
  })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// update status of project
router.put("/weekly-status/:id", async (req, res) => {
  const status_id = req.params.id
  const date = new Date().toLocaleDateString()

  WeeklyStatus.findByPk(status_id)
    .then(async (status) => {
      await status.update(req.body)
      await status.update({ date: date })
    })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// delete status by status id
router.delete("/weekly-status/:id", (req, res) => {
  const status_id = req.params.id

  WeeklyStatus.findByPk(status_id)
    .then(async (status) => {
      await status.destroy()
    })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})
module.exports = router
