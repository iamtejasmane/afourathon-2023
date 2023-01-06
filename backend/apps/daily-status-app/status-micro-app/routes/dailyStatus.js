const express = require("express")
const utils = require("../utils/utils")

const { DailyStatus } = require("../db/db-mysql")
const router = express.Router()

// this api gets the list of daily status of a specific employee
// id: employee id
router.get("/daily-status/:id", async (req, res) => {
  const emp_id = req.params.id

  DailyStatus.findAll({ where: { emp_id: emp_id } })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// add employee status
// id: employee id
router.post("/daily-status/:id", async (req, res) => {
  const emp_id = req.params.id
  const { ticket_id, hours_spent, status, comments } = req.body

  // add date to status
  const date = new Date()

  DailyStatus.create({
    emp_id: emp_id,
    ticket_id: ticket_id,
    date: date,
    hours_spent: hours_spent,
    status: status,
    comments: comments,
  })
    .then((status) => {
      res.send(utils.createResult(null, status))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.put("/daily-status/:id", async (req, res) => {
  const status_id = req.params.id
  const date = new Date().toLocaleDateString()

  DailyStatus.findByPk(status_id)
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
router.delete("/daily-status/:id", (req, res) => {
  const status_id = req.params.id

  DailyStatus.findByPk(status_id)
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
