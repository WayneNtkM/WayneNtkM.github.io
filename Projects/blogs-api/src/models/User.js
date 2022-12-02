module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  user.associate = ({ BlogPost }) => {
    user.hasMany(BlogPost, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
  };
  return user;
};