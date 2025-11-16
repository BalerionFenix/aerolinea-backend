import { DataTypes } from "sequelize";
import sequelize from "../../../config/config_db.js";

const Rol = sequelize.define("Rol", {
    rol_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "rol",
    timestamps: false
});

export default Rol;
