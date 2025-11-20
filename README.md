
## ✈️ Aerolínea Backend

[![Node.js](https://img.shields.io/badge/Node.js-v18-green?logo=node.js)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue?logo=postgresql)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)


Backend modular para la gestión de **bases aéreas**, **usuarios**, **roles**, **aeronaves** y **mantenimientos**, implementado en **Node.js**, **Express** y **Sequelize** sobre **PostgreSQL**.

-----

## 🛠️ Tecnologías utilizadas

El proyecto está construido con un stack moderno enfocado en la modularidad y el rendimiento:

  * **Node.js** (ESM)
  * **Express**
  * **PostgreSQL**
  * **Sequelize ORM**
  * **Arquitectura por dominios** (Modular)
  * Seeders automáticos
  * Middleware modular

-----

## 🚀 Cómo ejecutar el proyecto (¡Primeros Pasos\!)

Estos pasos te permitirán tener el servidor backend corriendo en tu entorno local rápidamente.

### 1\. Clonar el repositorio

```bash
git clone <https://github.com/BalerionFenix/aerolinea-backend.git>
cd aerolinea_backend
```

### 2\. Instalar dependencias

```bash
npm install
```

### 3\. Configurar la base de datos PostgreSQL

Asegúrate de que tienes un servidor **PostgreSQL** corriendo y crea la base de datos:

```sql
CREATE DATABASE aerolinea_db;
```

> **Nota:** La configuración por defecto está en `config/config_db.js` (DB: `aerolinea_db`, User: `postgres`, Pass: `12345`).

### 4\. Ejecutar el servidor (Modo Desarrollo)

Este comando es el más recomendado. Utiliza `nodemon` para reinicio automático, realiza la **sincronización de modelos** y ejecuta los **seeders iniciales** automáticamente al arrancar.

```bash
npm run dev
```

### 5\. Probar la API

El servidor estará escuchando en el puerto configurado:

```bash
http://localhost:4000/api
```

-----

## 🔗 Rutas principales

El endpoint base para todas las rutas es `http://localhost:4000/api`.

| Módulo | Endpoint | Descripción |
| :--- | :--- | :--- |
| **Base** | `/api/base` | CRUD de bases aéreas |
| **Avión** | `/api/avion` | CRUD de aeronaves |
| **Usuario** | `/api/usuario` | Usuarios y autenticación |
| **Rol** | `/api/rol` | Gestión de roles |
| **Mantenimiento** | `/api/mantenimiento` | Registros de mantenimientos |
| **Tipo de Mantenimiento** | `/api/tipo-mantenimiento` | Tipos de mantenimiento |

-----

## 🏗️ Estructura del proyecto por Módulos

El backend sigue una arquitectura modular donde cada dominio de negocio tiene su propia estructura interna (`models/`, `controllers/`, `routes/`, etc.).

### Módulos Principales

| Módulo | Entidades Principales | Propósito |
| :--- | :--- | :--- |
| **Base** | Bases Aéreas, Aviones | Gestión de la infraestructura aérea. |
| **Usuario** | Usuarios, Roles | Gestión de acceso, autenticación y permisos. |
| **Mantenimiento** | Mantenimientos, Tipos de Mantenimiento | Registro y control de las revisiones de aeronaves. |

### Carpeta `config/`

Contiene archivos esenciales de configuración:

  * **config.js** → Configuración general (puerto, entorno).
  * **config\_db.js** → Configuración de la conexión a PostgreSQL con Sequelize.
  * **config\_seend.js** → Seeders automáticos para datos iniciales.

-----

## ⚙️ Configuración y Detalles Técnicos

### Arranque del Servidor (`server.js`)

Muestra la secuencia de inicio:

```javascript
// ... importaciones ...
async function startServer() {
    setupAssociations();
    await sequelize.sync({ alter: true }); 
    await seed();                        
    // ...
}
startServer();
```

### Asociaciones entre Modelos (`app/associations.js`)

Se definen las relaciones **uno a muchos** utilizando Sequelize:

```javascript
Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });
Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

Base.hasMany(Usuario, { foreignKey: 'base_codigo', as: 'usuarios' });
Usuario.belongsTo(Base, { foreignKey: 'base_codigo', as: 'base' });

// ... y otras asociaciones clave ...
```
