import { DataTypes } from "sequelize";
import sequelize from "../../../config/config_db.js";
import Persona from "./Persona.js";

const MiembroTripulacion = sequelize.define("MiembroTripulacion", {
    miembro_codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: Persona, key: "persona_codigo" }
    },
    cargo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "miembro_tripulacion",
    timestamps: false
});

export default MiembroTripulacion;
