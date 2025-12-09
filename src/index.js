import 'dotenv/config';
import app from "./app.js";
import { PORT } from "./config/config.js";
import sequelize from "./config/config_db.js";
import { setupAssociations } from "./app/associations.js";
import { seed } from "./config/config_seend.js";

async function startServer() {
    try {
        setupAssociations();
        await sequelize.sync({ alter: true });
        await seed();
        console.log('All models were synchronized successfully.');
        console.log("Firebase project:", process.env.FIREBASE_PROJECT_ID);

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error("Error starting server:", err);
        process.exit(1); // opcional: salir con error
    }
}

startServer();
