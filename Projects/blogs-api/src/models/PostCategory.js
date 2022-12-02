module.exports = (sequelize, DataTypes) => {
  const postCategory = sequelize.define('PostCategory', {
    postId: {
      allowNull: false,
      refences: { model: 'BlogPost', key: 'id' },
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      allowNull: false,
      refences: { model: 'Category', key: 'id' },
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    sequelize,
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });
  postCategory.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost, { through: postCategory, as: 'posts',
    foreignKey: 'categoryId', onDelete: 'CASCADE' });
    BlogPost.belongsToMany(Category, { through: postCategory,
      as: 'categories', foreignKey: 'postId', onDelete: 'CASCADE' });
  };
  return postCategory;
};