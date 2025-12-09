import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Piloto = sequelize.define(
  "Piloto",
  {
    piloto_codigo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: "persona",
        key: "persona_codigo",
      },
      onDelete: "CASCADE",
    },
    horas_vuelo: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    licencia: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fecha_vencimiento_licencia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    certificaciones: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "piloto",
    timestamps: false,
  }
);

export default Piloto;
