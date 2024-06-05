// model for the ticket table
// auto-specifies 'Tickets' table in the tstat_db database

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define("Ticket", {
    title: {
      type: DataTypes.STRING,
    },
    resp_group: {
      type: DataTypes.STRING,
    },
    requestor: {
      type: DataTypes.STRING,
    },
    requestor_email: {
      type: DataTypes.STRING,
    },
    requestor_phone: {
      type: DataTypes.STRING,
    },
    acct_dept: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    location_room: {
      type: DataTypes.STRING,
    },
  });

  return Ticket;
};
