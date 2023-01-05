const express = require("express")
const utils = require("../utils/utils")

const { WeeklyStatusEmails } = require("../../../db-server/db/db-mysql")

const router = express.Router()

// to get the weekly status email list by project
router.get("/weekly-status-emails/:id", (req, res) => {
  const project_id = req.params.id

  WeeklyStatusEmails.findAll({ where: { project_id: project_id } })
    .then((emails) => {
      res.send(utils.createResult(null, emails))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

// update the email list
router.put("/weekly-status-emails/:id", async (req, res) => {
  const project_id = req.params.id
  const { project_mailing_list } = req.body

  let emailStatus
  for (i = 0; i < project_mailing_list.length; i++) {
    emailStatus = await WeeklyStatusEmails.create({
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

// delete the email list
router.delete("/weekly-status-emails/:id", (req, res) => {
  const id = req.params.id
  WeeklyStatusEmails.findByPk(id)
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
