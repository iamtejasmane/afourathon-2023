const express = require("express")
const utils = require("../utils/utils")

const { Projects } = require("../../../db-server/db/db-mysql")
const router = express.Router()

router.get("/projects", (req, res) => {
  Projects.findAll()
    .then((projects) => {
      res.send(utils.createResult(null, projects))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.get("/projects/:id", (req, res) => {
  const project_id = req.params.id

  Projects.findAll({ where: { project_id: project_id } })
    .then((project) => {
      res.send(utils.createResult(null, project))
    })
    .catch((err) => {
      res.send(utils.createResult(err, null))
    })
})

router.post("/projects", (req, res) => {})

module.exports = router
