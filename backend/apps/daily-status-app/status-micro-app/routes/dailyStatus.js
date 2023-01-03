const express = require("express")
const utils = require("../utils/utils")

const { DailyStatus, Employees } = require("../../../db-server/db/db-mysql")
const router = express.Router()

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

router.post("/daily-status/:id", async (req, res) => {
  const emp_id = req.params.id
  const { ticket_id, hours_spent, status, comments } = req.body
  const date = new Date().toLocaleDateString()

  DailyStatus.create({
    emp_id: emp_id,
    date: date,
    ticket_id: ticket_id,
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

  DailyStatus.findByPk(status_id)
    .then(async (status) => {
      await status.update(req.body)
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

  Projects.findByPk(status_id)
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
