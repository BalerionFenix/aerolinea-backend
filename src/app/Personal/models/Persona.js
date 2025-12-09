import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";

const Persona = sequelize.define(
  "Persona",
  {
    persona_codigo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    base_codigo: {
<<<<<<< Updated upstream
        type: DataTypes.STRING,
        allowNull: false,
        references: { model: Base, key: "base_codigo" }
=======
      type: DataTypes.INTEGER,
      allowNull: false,
>>>>>>> Stashed changes
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "persona",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Persona;
