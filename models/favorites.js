module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        perks: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Favorite.associate = function(models) {
        Favorite.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Favorite;
};