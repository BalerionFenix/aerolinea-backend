import app from "./app.js";
import {PORT} from "./config/config.js"
import sequelize from "./config/config_db.js";
import { setupAssociations } from "./models/associations.js";


async function startServer() {
    
    setupAssociations();
    
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer();
