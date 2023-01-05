const express = require("express")
const utils = require("../utils/utils")

const {
  WeeklyStatusEmails,
  Projects,
  WeeklyStatus,
} = require("../../../db-server/db/db-mysql")

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

  // get project to get the project details
  const project = await Projects.findByPk(project_id)

  const mailingList = await WeeklyStatusEmails.findAll({
    where: { project_id: project_id },
  })

  const subject =
    "Status Report of " +
    project.project_name +
    " for week ending" +
    lastUpdatedStatus.week_ending_date

  // create mail object
  let mailOptions = {
    from: fromEmail,
    to: mailingList,
    subject: subject,
    text: "Daily Updates:",
    html: "",
  }

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

module.exports = router
