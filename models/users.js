module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  }, {
    comment: 'Represents users of the system',
  });

  // eslint-disable-next-line func-names
  Users.associate = function (sqlz) {
    Users.belongsToMany(sqlz.roles, {
      as: 'roles',
      through: sqlz.users_roles,
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      },
    });
  };

  return Users;
};