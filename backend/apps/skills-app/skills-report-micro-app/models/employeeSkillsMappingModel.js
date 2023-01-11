module.exports = (sequlize, type) => {
  return sequlize.define("employee_skills_mappings", {
    employee_skills_mapping_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_id: type.INTEGER,
    skill_name: type.STRING,
    domain_name: type.STRING,
    skill_level: type.STRING,
    years_of_experience: type.INTEGER,
  })
}
