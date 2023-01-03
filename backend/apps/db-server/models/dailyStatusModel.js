module.exports = (sequlize, type) => {
  return sequlize.define("daily_status", {
    status_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_id: type.INTEGER,
    date: type.DATE,
    ticket_id: type.STRING,
    hours_spent: type.INTEGER,
    status: type.STRING,
    comments: type.TEXT,
  })
}
