import { Sequelize } from "sequelize";

 const sequelize = new Sequelize(
    "aerolinea_db",
    "postgres",
    "1234",
    {
        host: "localhost",
        dialect: "postgres",
    }
);

 export default sequelize;