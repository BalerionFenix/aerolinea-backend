import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";
import Base from "./Base.js";

const Person = sequelize.define("Person", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    baseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Base,
            key: "id",
        },
    }
}, {
    tableName: "person",
    timestamps: true,
});

export default Person;
