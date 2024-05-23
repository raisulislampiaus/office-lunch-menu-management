// models/user.js
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: { type: DataTypes.STRING, defaultValue: 'employee' },
    }, { timestamps: true });
  
    return User;
  };
  
  
  
  
  
  