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
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        perks: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Favorite;
};