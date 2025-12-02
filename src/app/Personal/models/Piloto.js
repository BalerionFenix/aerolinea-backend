import { DataTypes } from "sequelize";
import sequelize from "../../../config/config_db.js";
import Persona from "./Persona.js";

const Piloto = sequelize.define("Piloto", {
    piloto_codigo: {
        type: DataTypes.STRING,
        primaryKey: true,
        references: { model: Persona, key: "persona_codigo" }
    },
    horas_vuelo: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { min: 0 }
    },
    licencia: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    fecha_vencimiento_licencia: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    certificaciones: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: []
    },
    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "piloto",
    timestamps: false
});

export default Piloto;
