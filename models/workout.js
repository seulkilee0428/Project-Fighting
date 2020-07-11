module.exports = function (sequelize, DataTypes) {

    var Workout = sequelize.define("Workout", {
        // Giving the Workout model a name of type STRING
        name: DataTypes.STRING
    });

    Workout.associate = function (models) {
        // Associating Workout with Exercise
        // When a Workout is deleted, also delete any associated Exercise
        Workout.hasMany(models.Exercise, {
            onDelete: "cascade"
        });
    };

    return Workout;
};
