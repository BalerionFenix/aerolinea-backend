import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Base = sequelize.define("Base", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    ciudad: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    pais: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
    tableName: "base",
    timestamps: true,
});

export default Base;
