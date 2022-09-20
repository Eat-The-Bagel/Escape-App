const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Resolution extends Model {}

Resolution.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        resolution: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "resolution",
      }
);

// module.exports = Resolution;
