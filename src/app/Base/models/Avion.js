import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Avion = sequelize.define("Avion", {

        avion_codigo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fabricante: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        capacidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        anio_fabricacion: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        base_codigo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "OPERATIVO",
        },
        horas_vuelo_totales: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        ultimo_mantenimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        proximo_mantenimiento: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        activo: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        tableName: "avion",
        timestamps: true,
        /*createdAt: "created_at",
        updatedAt: "updated_at",*/
    }
);

export default Avion;







