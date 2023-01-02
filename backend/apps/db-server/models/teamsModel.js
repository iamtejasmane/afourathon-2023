module.exports = (sequlize, type) => {
  return sequlize.define("teams", {
    team_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: type.INTEGER,
    team_name: type.STRING,
    team_start_dt: type.DATE,
    team_end_dt: type.DATE,
    team_lead_name: type.STRING,
    team_lead_email: type.STRING,
  })
}
