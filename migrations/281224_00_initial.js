const {DataTypes} = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface}) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      likes: {
        type: DataTypes.INTEGER,
        default: 0 
      },
    })

    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })

    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })

    await queryInterface.addColumn('blogs', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('blogs', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'created_at', {
      type: DataTypes.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('users', 'updated_at', {
      type: DataTypes.DATE,
      allowNull: false,
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('blogs')
    await queryInterface.dropTable('users')
  },

}
