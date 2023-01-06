module.exports = (sequlize, type) => {
  return sequlize.define("weekly_status", {
    status_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: type.INTEGER,
    date: type.DATE,
    status: type.STRING,
    highligth: type.STRING,
    risk: type.TEXT,
    week_ending_date: type.DATE,
  })
}
