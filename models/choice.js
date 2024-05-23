// models/choice.js
module.exports = (sequelize, DataTypes) => {
    const Choice = sequelize.define('Choice', {}, { timestamps: true });
  
    return Choice;
  };