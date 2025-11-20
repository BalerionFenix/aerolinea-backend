Aerolínea Backend

Backend estructurado por módulos (Base, Usuario, Mantenimiento), usando Node.js, Express y Sequelize sobre PostgreSQL.

Tecnologías utilizadas

Node.js (ES Modules)

Express

PostgreSQL

Sequelize ORM

CORS

Seeders automáticos

Validadores

Middleware por módulo

Estructura general del proyecto
src/
│
├─ app/
│   ├─ Base/
│   │   ├─ models/
│   │   ├─ dto/
│   │   ├─ repository/   (DAO)
│   │   ├─ controllers/
│   │   ├─ validators/
│   │   ├─ middleware/
│   │   └─ routes/
│   │
│   ├─ Usuario/
│   │   ├─ models/
│   │   ├─ dto/
│   │   ├─ repository/
│   │   ├─ controllers/
│   │   ├─ validators/
│   │   ├─ middleware/
│   │   └─ routes/
│   │
│   ├─ Mantenimiento/
│       ├─ models/
│       ├─ dto/
│       ├─ repository/
│       ├─ controllers/
│       ├─ validators/
│       ├─ middleware/
│       └─ routes/
│
├─ config/
│   ├─ config.js          → puerto del servidor
│   ├─ config_db.js       → conexión Sequelize
│   ├─ config_seend.js    → seeders iniciales
│
├─ app.js                 → carga de rutas y middlewares globales
└─ server.js              → arranque del servidor

Configuración principal (app.js)
import express from "express";
import baseRouter from "./app/Base/routes/baseRouter.js";
import avionRouter from "./app/Base/routes/avionRouter.js";

import mantenimientoRouter from "./app/Mantenimiento/routes/mantenimientoRouter.js";
import tipoMantenimientoRouter from "./app/Mantenimiento/routes/tipoMantenimientoRouter.js";
import usuarioRouter from "./app/Usuario/routes/UsuariosRouter.js";
import rolRouter from "./app/Usuario/routes/RolRouter.js";
import cors from "cors";

const app = express();
app.use(express.json(), cors());
app.use('/api', [
    baseRouter,
    mantenimientoRouter,
    tipoMantenimientoRouter,
    usuarioRouter,
    rolRouter,
    avionRouter
]);

export default app;

Arranque del servidor (server.js)
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

Conexión con PostgreSQL (config_db.js)
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

Variables de entorno (config.js)
export const PORT = process.env.PORT || 4000;

Asociaciones definidas (app/associations.js)
Usuario y Roles

Un rol tiene muchos usuarios

Un usuario pertenece a un rol

Usuario y Base

Una base tiene muchos usuarios

Un usuario pertenece a una base

Base y Aviones

Una base tiene muchos aviones

Un avión pertenece a una base

Mantenimiento

Un tipo de mantenimiento tiene muchos mantenimientos

Cada mantenimiento pertenece a un tipo de mantenimiento

Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

Base.hasMany(Usuario, { foreignKey: 'base_codigo', as: 'usuarios' });
Usuario.belongsTo(Base, { foreignKey: 'base_codigo', as: 'base' });

Base.hasMany(Avion, { foreignKey: 'base_codigo', as: 'aviones' });
Avion.belongsTo(Base, { foreignKey: 'base_codigo', as: 'base' });

TipoMantenimiento.hasMany(Mantenimiento, {
    foreignKey: 'tipo_mantenimiento_id',
    as: 'mantenimientos'
});

Mantenimiento.belongsTo(TipoMantenimiento, {
    foreignKey: 'tipo_mantenimiento_id',
    as: 'tipo_mantenimiento'
});

Seeders (config_seend.js)

Inserta:

Roles: Administrador, Usuario

Base aérea inicial: El Dorado

Usuario inicial: Docente Pitter

await Rol.findOrCreate({
    where: { nombre: 'Administrador' },
    defaults: {
        descripcion: 'Rol con acceso completo',
        activo: true
    }
});

await Base.findOrCreate({
    where: { nombre: 'Base Aérea El Dorado' },
    defaults: {
        base_codigo: '1',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        direccion: 'Avenida El Dorado #103-90',
        activo: true
    }
});

Rutas principales (/api)
Módulo	Ruta	Contenido
Base	/api/base	CRUD de bases aéreas
Avión	/api/avion	CRUD de aviones
Usuario	/api/usuario	Usuarios, roles, login
Roles	/api/rol	Gestión de roles
Mantenimiento	/api/mantenimiento	Mantenimientos asociados
Tipos de mantenimiento	/api/tipo-mantenimiento	Gestión de tipos
Arquitectura por módulos

Cada módulo tiene:

models/ Modelo Sequelize

dto/ Transformación de datos

repository/ Acceso a BD (DAO)

controllers/ Lógica del caso de uso

validators/ Validaciones de entrada

middleware/ Autorización / validaciones avanzadas

routes/ Rutas Express

Esta estructura permite escalabilidad y separación de responsabilidades.
