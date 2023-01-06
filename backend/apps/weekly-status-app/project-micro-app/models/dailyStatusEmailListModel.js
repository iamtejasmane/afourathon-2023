module.exports = (sequlize, type) => {
  return sequlize.define("daily_status_email_lists", {
    daily_status_report_mailing_list_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    project_id: type.INTEGER,
    email: type.STRING,
    is_sent: type.BOOLEAN,
  })
}
