module.exports = (sequlize, type) => {
  return sequlize.define("projects", {
    project_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    emp_id: type.INTEGER,
    project_name: type.STRING,
    project_start_dt: type.DATE,
    project_end_dt: type.DATE,
    project_manager_name: type.STRING,
    project_manager_email: type.STRING,
  });
};
