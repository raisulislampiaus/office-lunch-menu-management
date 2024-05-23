// models/menu.js
module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
      date: DataTypes.DATEONLY,
    }, { timestamps: true });
  
    return Menu;
  };
  