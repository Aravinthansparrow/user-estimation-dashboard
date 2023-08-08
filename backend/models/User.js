const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const Client = require('./Client');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('admin', 'developer'),
    allowNull: false,
    defaultValue: 'developer',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
});
User.prototype.changePassword = async function (newPassword) {
  const saltRounds = 10;
  this.password = await bcrypt.hash(newPassword, saltRounds);
  await this.save();
};

// Insertion of user data
User.sync({ force: true })
  .then(async () => {
    // Insert initial values with hashed passwords
    const users = [
      { username: "aravinthan", email: 'admin001@gmail.com', password: '@Admin001', role: 'admin' },
      { username: "rhoshan", email: 'developer001@gmail.com', password: '@Developer001', role: 'developer' },
      { username: "elonmusk", email: 'admin002@gmail.com', password: '@Admin002', role: 'admin' },
      { username: "karthick", email: 'developer002@gmail.com', password: '@Developer002', role: 'developer' },
      { username: "harshini", email: 'admin003@gmail.com', password: '@Admin003', role: 'admin' },
      { username: "logesh", email: 'developer004@gmail.com', password: '@Developer003', role: 'developer' },
      { username: "Ismayil", email: 'developer005@gmail.com', password: '@Developer004', role: 'developer' },
      { username: "salim", email: 'developer006@gmail.com', password: '@Developer005', role: 'developer' },
      { username: "johnson", email: 'developer007@gmail.com', password: '@Developer006', role: 'developer' }
    ];

    // Generate hashed passwords for each user
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { ...user, password: hashedPassword };
    }));

    // Insert the users with hashed passwords into the database
    return User.bulkCreate(hashedUsers);
  })
  .then(() => {
    console.log('User table created and initial values inserted.');
  })
  .catch((error) => {
    console.error('Error creating Users table:', error);
  });

module.exports = User;