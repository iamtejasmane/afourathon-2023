module.exports = (sequlize, type) => {
  return sequlize.define("skills", {
    skill_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    domain_id: type.INTEGER,
    skill_name: type.STRING,
  })
}
