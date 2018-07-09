module.exports = function (sequelize, DataTypes) {
  const Roles = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    comment: 'Represents the different roles that a user can have when they login to the application',
  });

  // eslint-disable-next-line func-names
  Roles.associate = function (sqlz) {
    Roles.belongsToMany(sqlz.users, {
      as: 'users',
      through: sqlz.users_roles,
      foreignKey: {
        name: 'role_id',
        allowNull: false,
      },
    });
  };

  return Roles;
};