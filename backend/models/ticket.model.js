// model for the ticket table
// auto-specifies 'Tickets' table in the tstat_db database

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    data: {
      type: DataTypes.JSON,
    },
  });

  return Ticket;
};
