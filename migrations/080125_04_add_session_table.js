const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryinterface }) => {
    queryinterface.createTable('sessions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {model: 'users', key: 'id'}
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })
  },

  down: async ({ context: queryinterface }) => {
    await queryinterface.dropTable('sessions')
  }
}