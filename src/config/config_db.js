import { Sequelize } from "sequelize";

<<<<<<< Updated upstream
<<<<<<< Updated upstream
 const sequelize = new Sequelize(
     "aerolinea_db",
     "postgres_db",
     "qnBtMX2R2ht0RxFTQlVZKAgi3YUO49oz",
     {
         host: "dpg-d4evj6m3jp1c738p6ovg-a.oregon-postgres.render.com",
         dialect: "postgres",
         port: 5432,
         dialectOptions: {
             ssl: true,
             rejectUnauthorized: false,
         }


     },

   /* "aerolinea_db",
    "postgres",
    "123456",
    {
        host: "localhost",
        port: 5433,
        dialect: "postgres",
    }*/
);
=======
=======
>>>>>>> Stashed changes
 /*const sequelize = new Sequelize(
     "aerolinea_db",
     "postgres_db",
     "qnBtMX2R2ht0RxFTQlVZKAgi3YUO49oz",
     {
         host: "dpg-d4evj6m3jp1c738p6ovg-a.oregon-postgres.render.com",
         dialect: "postgres",
         port: 5433,
         dialectOptions: {
             ssl: true,
             rejectUnauthorized: false,
         }
        }
        );*/
    const sequelize = new Sequelize(
        "aerolinea_db",
        "postgres",       
        "12345",          
        {
            host: "localhost",
            port: 5433,     
            dialect: "postgres",
        }
    );
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

console.log(`Sequelize DB config: host=${sequelize.options.host} port=${sequelize.options.port} database=${sequelize.config.database}`);

 export default sequelize;