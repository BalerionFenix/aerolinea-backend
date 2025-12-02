import app from "./app.js";
import {PORT} from "./config/config.js"
import sequelize from "./config/config_db.js";
import {setupAssociations} from "./app/associations.js";
import {seed} from "./config/config_seend.js";



async function startServer() {
    setupAssociations();
    await sequelize.sync({ alter: true });
    await seed();
    console.log('All models were synchronized successfully.');

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

startServer();
