import { DataTypes } from "sequelize";
import sequelize from "../../../config/config_db.js";
import Rol from "./Rol.js";
import Base from "../../Base/models/Base.js";


const Usuario = sequelize.define("Usuario", {
    usuario_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    rol_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: Rol, key: "rol_id" }
    },
    base_codigo: {
        type: DataTypes.INTEGER,
        references: { model: Base, key: "base_codigo" }
    },
    /*persona_codigo: {
        type: DataTypes.STRING,
        references: { model: Persona, key: "persona_codigo" }
    },*/
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "usuario",
    timestamps: false
});


export default Usuario;
