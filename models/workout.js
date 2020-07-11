module.exports = function (sequelize, DataTypes) {

    var Workout = sequelize.define("Workout", {
        name: DataTypes.STRING
    });

    Workout.associate = function (models) {

        Workout.hasMany(models.Exercise, {
            onDelete: "cascade"
        });
    };

    return Workout;
};
