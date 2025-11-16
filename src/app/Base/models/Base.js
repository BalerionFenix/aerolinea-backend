import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Base = sequelize.define("Base", {
    base_codigo: {
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
    },
    estado: {
        type: DataTypes.ENUM("Activo", "Inactivo"),
        allowNull: false,
        defaultValue: "Activo",
    }
}, {
    tableName: "base",
    timestamps: true,
});

export default Base;
