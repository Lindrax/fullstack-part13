const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Sessions extends Model {}

Sessions.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {model: 'users', key: 'id'}
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'sessions'
})

module.exports = Sessions