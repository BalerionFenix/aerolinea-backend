import { Sequelize } from "sequelize";

 const sequelize = new Sequelize(
    "aerolinea_db",
    "postgres",
    "1234",
    {
        host: "localhost",
        port: 5433,
        dialect: "postgres",
    }
);

console.log(`Sequelize DB config: host=${sequelize.options.host} port=${sequelize.options.port} database=${sequelize.config.database}`);

 export default sequelize;