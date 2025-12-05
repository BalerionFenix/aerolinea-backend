import { DataTypes } from "sequelize";
import sequelize from "../../../config/config_db.js";
import Base from "../../Base/models/Base.js";

const Persona = sequelize.define("Persona", {
    persona_codigo: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    base_codigo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: Base, key: "base_codigo" }
    },
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
    tableName: "persona",
    timestamps: false
});

export default Persona;
