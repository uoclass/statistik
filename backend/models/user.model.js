// model for the user table
// auto-specifies 'Users' table in the tstat_db database

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(60).BINARY,
      allowNull: false,
    },
  });

  return User;
};
