module.exports = (sequlize, type) => {
  return sequlize.define("employees", {
    emp_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    team_id: type.INTEGER,
    skill_id: type.INTEGER,
    first_name: type.STRING,
    last_name: type.STRING,
    gender: type.STRING,
    email: type.STRING,
    password: type.STRING,
    mobile: type.BIGINT,
    designation: type.STRING,
    role: type.INTEGER,
    is_admin: type.BOOLEAN,
  })
}
