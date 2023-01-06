const express = require("express")
const utils = require("../utils/utils")

const { DailyStatusEmails } = require("../db/db-mysql")

const router = express.Router()

router.get("/daily-status-emails/:id", (req, res) => {
  const project_id = req.params.id

  DailyStatusEmails.findAll({ where: { project_id: project_id } })
    .then((emails) => {
      res.send(utils.createResult(null, emails))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.put("/daily-status-emails/:id", async (req, res) => {
  const project_id = req.params.id
  const { project_mailing_list } = req.body

  let emailStatus
  for (i = 0; i < project_mailing_list.length; i++) {
    emailStatus = await DailyStatusEmails.create({
      project_id: project_id,
      email: project_mailing_list[i],
    })
  }
  if (!emailStatus) {
    res.status(400).json({
      status: "error",
      message: "invalid email",
      data: emailStatus,
    })
  } else {
    res.send(utils.createResult(null, emailStatus))
  }
})

router.delete("/daily-status-emails/:id", (req, res) => {
  const id = req.params.id
  DailyStatusEmails.findByPk(id)
    .then(async (email) => {
      console.log(email)
      email.project_id = null
      await email.destory()
    })
    .then((email) => {
      res.send(utils.createResult(null, email))
    })
    .catch((error) => {
      res.send(utils.createResult(error, null))
    })
})

module.exports = router
