module.exports = function (sequelize, DataTypes) {
  const UsersRoles = sequelize.define('users_roles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    comment: 'Represents roles assigned to users',
  });

  return UsersRoles;
};