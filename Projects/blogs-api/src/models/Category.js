module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('Category', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });
  return user;
};