module.exports = (sequlize, type) => {
  return sequlize.define("domains", {
    domain_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    domain_name: type.STRING,
  })
}
