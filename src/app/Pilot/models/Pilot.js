import sequelize from "../../../config/config_db.js";
import { DataTypes } from "sequelize";
import Base from "../../Base/models/Base.js";

const Pilot = sequelize.define("Person", {
    code: {
        type: DataTypes.STRING(50),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    baseName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: Base,
            key: "name",
        },
    },
}, {
    tableName: "PERSONA",
    timestamps: false,
});

export default Pilot;