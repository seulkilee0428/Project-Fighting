module.exports = function (sequelize, DataTypes) {
    const Exercise = sequelize.define("Exercise", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Exercise.associate = function (models) {
        Exercise.belongsTo(models.Workout, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Exercise;
};
