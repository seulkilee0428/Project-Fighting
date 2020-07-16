module.exports = function (sequelize, DataTypes) {
    const Exercise = sequelize.define("Exercise", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        desc: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        },
        steps: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        },
        tips: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        },
        warn: {
            type: DataTypes.TEXT,
            allowNull: true,
            len: [1]
        },
        videoUrl: {
            type: DataTypes.TEXT,
            allowNull: true,
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
