const { DataTypes, QueryInterface } = require('sequelize')

module.exports = {
  up: async ({context: queryInterface}) => {
    await queryInterface.addColumn('users', 'disabled', {
      type: DataTypes.BOOLEAN,
      default: false
    })
  },
  down: async ({ context: queryInterface}) => {
    await queryInterface.removeColumn('users', 'disabled')
  }
}