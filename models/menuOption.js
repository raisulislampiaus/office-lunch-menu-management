// models/menuOption.js
module.exports = (sequelize, DataTypes) => {
    const MenuOption = sequelize.define('MenuOption', {
      option_name: DataTypes.STRING,
    }, { timestamps: true });
  
    return MenuOption;
  };