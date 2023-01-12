const express = require("express")
const utils = require("../utils/utils")
const transporter = require("../transporter")
const sgMail = require("@sendgrid/mail")

require("dotenv").config()

const { WeeklyStatusEmails, Projects, WeeklyStatus } = require("../db/db-mysql")

const fromEmail = process.env.EMAILFROM

const router = express.Router()

// This api is sending out weekly status emails for each project
// id: project id
router.get("/send-mail/:id", async (req, res) => {
  const project_id = req.params.id
  // const { week_ending_date } = req.body

  // get latest status
  const statuses = await WeeklyStatus.findAll({
    project_id: project_id,
  })
  const lastUpdatedStatus = statuses[statuses.length - 1]
  const status = {
    status: lastUpdatedStatus.status,
    highligth: lastUpdatedStatus.highligth,
    risk: lastUpdatedStatus.risk,
    week_ending_date: lastUpdatedStatus.week_ending_date,
  }
  // get project to get the project details
  const project = await Projects.findByPk(project_id)

  const mailingList = await WeeklyStatusEmails.findAll({
    where: { project_id: project_id },
  })

  emails = []
  for (i = 0; i < mailingList.length; i++) {
    emails.push(mailingList[i].email)
  }

  const subject =
    "Status Report of " +
    project.project_name +
    " for week ending " +
    new Date(lastUpdatedStatus.week_ending_date).toLocaleDateString()

  // create mail object
  let mailOptions = {
    from: fromEmail,
    to: emails,
    subject: subject,
    text: "Status Updates:",
    html: `<b>Status: ${status.status}<b><br>
    <b>Highligths: ${status.highligth}<b><br>
    <b>Risk: ${status.risk}<b><br>
    <b>Week Ending Date: ${status.week_ending_date}<b><br>
    `,
  }

  console.log("Mailing object".blue)
  console.log(mailOptions)
  // Delivering mail with sendMail method
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send(utils.createResult(error, null))
    } else {
      console.log("Email sent: " + info.response)
      res.send(utils.createResult(null, info.response))
    }
  })
})

router.get("/sendgrid-mail/:id", async (req, res) => {
  const project_id = req.params.id
  const statuses = await WeeklyStatus.findAll({
    project_id: project_id,
  })
  const lastUpdatedStatus = statuses[statuses.length - 1]
  const status = {
    status: lastUpdatedStatus.status,
    highligth: lastUpdatedStatus.highligth,
    risk: lastUpdatedStatus.risk,
    week_ending_date: lastUpdatedStatus.week_ending_date,
  }
  // get project to get the project details
  const project = await Projects.findByPk(project_id)

  const mailingList = await WeeklyStatusEmails.findAll({
    where: { project_id: project_id },
  })

  emails = []
  for (i = 0; i < mailingList.length; i++) {
    emails.push(mailingList[i].email)
  }

  const subject =
    "Status Report of " +
    project.project_name +
    " for week ending " +
    new Date(lastUpdatedStatus.week_ending_date).toLocaleDateString()

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: [...emails],
    from: "vijaytembugade21@gmail.com",
    subject: subject,
    text: "Weekly Status",
    html: `<b>Status: ${status.status}<b><br>
    <b>Highligths: ${status.highligth}<b><br>
    <b>Risk: ${status.risk}<b><br>
    <b>Week Ending Date: ${status.week_ending_date}<b><br>
    `,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent")
    })
    .catch((error) => {
      console.error(error)
    })
})

module.exports = router
