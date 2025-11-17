import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const TipoMantenimiento = sequelize.define('TipoMantenimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    duracion_estimada: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    frecuencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'tipo_mantenimientos',
    timestamps: true
});

export default TipoMantenimiento;