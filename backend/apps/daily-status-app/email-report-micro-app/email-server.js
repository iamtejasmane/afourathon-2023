const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cron = require("node-cron")
const transporter = require("./transporter")
require("dotenv").config()

const {
  DailyStatus,
  DailyStatusEmails,
  Employees,
  Teams,
  Projects,
} = require("../../db-server/db/db-mysql")

const app = express()

app.use(express.json())
app.use(cors("*"))
app.use(morgan("combined"))

const fromEmail = process.env.EMAILFROM

// Delivering mail with sendMail method

cron.schedule("* * * * *", async function () {
  console.log("---------------------")
  console.log("Running Cron Process")

  // get all teams
  const teams = await Teams.findAll()
  console.log(teams[1].team_id)

  // get all employees by its team id
  let employee_details = []
  for (i = 0; i < teams.length; i++) {
    const emps = await Employees.findAll({
      where: { team_id: teams[i].team_id },
    })
    // get daily email list
    const dailyStatusEmailsList = await DailyStatusEmails.findAll({
      where: { project_id: teams[i].project_id },
    })

    // get a project associated with the team
    const project = await Projects.findByPk(teams[i].project_id)

    // create a mailing list to send mail
    let emailList = []
    for (k = 0; k < dailyStatusEmailsList.length; k++) {
      emailList.push(dailyStatusEmailsList[k].email)
    }
    console.log("Email list".yellow)
    console.log(emailList)
    for (j = 0; j < emps.length; j++) {
      // create a object of  employee id, email address and team id
      // to get the status
      // get status of an employee
      const empStatus = await DailyStatus.findAll({
        where: { emp_id: emps[j].emp_id },
      })
      console.log("emp status".red)
      const lastUpdatedStatus = empStatus[empStatus.length - 1]
      console.log(lastUpdatedStatus)

      let emp_details = {}

      let create_status = {}
      emp_details["emp_id"] = emps[j].emp_id
      emp_details["email"] = emps[j].email
      emp_details["team_id"] = teams[i].team_id
      emp_details["project_id"] = teams[i].project_id
      emp_details["project_name"] = project.project_name
      emp_details["email_list"] = emailList

      if (lastUpdatedStatus) {
        create_status["ticket_id"] = lastUpdatedStatus.ticket_id
        create_status["status"] = lastUpdatedStatus.status
        create_status["hours_spent"] = lastUpdatedStatus.hours_spent
        create_status["comments"] = lastUpdatedStatus.comments

        emp_details["status"] = create_status
      } else {
        emp_details["status"] = create_status
      }

      employee_details.push(emp_details)
    }
  }

  console.log(employee_details)

  // get status from their empid
  for (i = 0; i < employee_details.length; i++) {
    // create subject
    const subject =
      "Daily Status Report of " +
      employee_details[i].project_name +
      " for " +
      new Date().toLocaleDateString()

    // create mail object
    let mailOptions = {
      from: fromEmail,
      to: employee_details[i].email,
      cc: employee_details[i].email_list,
      subject: subject,
      text: "Daily Updates:",
      html: `
<table>
  <tr>
    <td>Ticket Id</td>
    <td>Status</td>
    <td>Hours Spent</td>
    <td>Comments</td>
  </tr>
  <tr>
    <td>${employee_details[i].status.ticket_id}</td>
    <td>${employee_details[i].status.status}</td>
    <td>${employee_details[i].status.hours_spent} hours</td>
    <td>${employee_details[i].status.comments}Streetdog</td>
  </tr>
</table>`,
    }

    console.log(mailOptions)

    // Delivering mail with sendMail method
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log(error)
      else console.log("Email sent: " + info.response)
    })
  }
})

app.listen(8080, () => {
  console.log(
    "daily status email server listening on port: ".green + "8080".blue
  )
})
