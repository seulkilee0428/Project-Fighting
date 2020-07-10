module.exports = function (sequelize, DataTypes) {

    // 'Post' in the define method, will be the name
    // of the table created in the db
    const Exercise = sequelize.define("Exercise", {
        // you do not need to define an id
        // sequelize does that for you

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

    // set up associations if you want to use includes
    // when serving up json from your routes

    Exercise.associate = function (models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Exercise.belongsTo(models.Workout, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Exercise;
};
