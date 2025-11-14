import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Mantenimiento = sequelize.define('Mantenimiento', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_mantenimiento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tipo_mantenimientos', // Sequelize pluraliza automáticamente
            key: 'id'
        }
    },
    aeronave_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'aeronaves', // Asumiendo que existe este modelo
            key: 'id'
        }
    },
    fecha_programada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    fecha_inicio: {
        type: DataTypes.DATE,
        allowNull: true
    },
    fecha_fin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    costo_estimado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0
        }
    },
    costo_real: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.ENUM('programado', 'en_proceso', 'completado', 'cancelado'),
        defaultValue: 'programado'
    },
    personal_asignado: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'mantenimientos',
    timestamps: true
});

module.exports = Mantenimiento;