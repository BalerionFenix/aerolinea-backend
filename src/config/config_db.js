import { Sequelize } from "sequelize";

 const sequelize = new Sequelize(
    "aerolinea_db",
    "postgres",
    "12345",
    {
        host: "localhost",
        dialect: "postgres",
    }
);

 export default sequelize;