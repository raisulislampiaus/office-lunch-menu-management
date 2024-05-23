// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Menu = require('./menu')(sequelize, DataTypes);
db.MenuOption = require('./menuOption')(sequelize, DataTypes);
db.Choice = require('./choice')(sequelize, DataTypes);

db.User.hasMany(db.Choice);
db.Choice.belongsTo(db.User);

db.Menu.hasMany(db.MenuOption);
db.MenuOption.belongsTo(db.Menu);

db.MenuOption.hasMany(db.Choice);
db.Choice.belongsTo(db.MenuOption);

module.exports = db;

// Testing the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
