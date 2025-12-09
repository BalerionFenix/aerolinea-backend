import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Vuelo = sequelize.define("Vuelo", {
        vuelo_num: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        origen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destino: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hora: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        avion_codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        piloto_codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "PROGRAMADO",
        },
        hora_salida_real: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        hora_llegada_real: {
            type: DataTypes.TIME,
            allowNull: true,
        },
        duracion_minutos: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        observaciones: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        tableName: "vuelo",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

export default Vuelo;