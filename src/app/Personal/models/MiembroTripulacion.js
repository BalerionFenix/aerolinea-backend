import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const MiembroTripulacion = sequelize.define(
  "MiembroTripulacion",
  {
    miembro_codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "persona",
        key: "persona_codigo",
      },
      onDelete: "CASCADE",
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "miembro_tripulacion",
    timestamps: false,
  }
);

export default MiembroTripulacion;
