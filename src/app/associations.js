import Sequelize from "../config/config_db.js";
//import Aeronave from '../modules/base/models/Aeronave.js';
import Mantenimiento from "./Mantenimiento/models/Mantenimiento.js";
import TipoMantenimiento from "./Mantenimiento/models/TipoMantenimiento.js";
import Rol from "./Usuario/models/Rol.js";
import Usuario from "./Usuario/models/Usuario.js";
import Base from "./Base/models/Base.js";

// Importaciones futuras de modelos que aún no existen
// import Vuelo from '../modules/base/models/Vuelo.js';
// import Usuario from '../modules/person/models/Usuario.js';
// import Piloto from '../modules/person/models/Piloto.js';
// import Miembro from '../modules/miembro/models/Miembro.js';

export const setupAssociations = () => {
    console.log('Configurando TODAS las relaciones de modelos...');

    try {
        // =============================================
        // RELACIONES DEL MÓDULO PERSON (Usuarios, Roles)
        // =============================================

        // Usuario ↔ Rol (Un usuario pertenece a un rol)
        Rol.hasMany(Usuario, {
            foreignKey: 'rol_id',
            as: 'usuarios'
        });

        Usuario.belongsTo(Rol, {
            foreignKey: 'rol_id',
            as: 'rol'
        });

        // Usuario ↔ Base (Un usuario pertenece a una base)
        Base.hasMany(Usuario, {
            foreignKey: 'base_codigo',
            as: 'usuarios'
        });

        Usuario.belongsTo(Base, {
            foreignKey: 'base_codigo',
            as: 'base'
        });

        // =============================================
        // RELACIONES DEL MÓDULO BASE (Aeronaves, Vuelos)
        // =============================================

        // Aeronave ↔ Vuelo (Una aeronave tiene muchos vuelos)
        /*Aeronave.hasMany(Vuelo, {
            foreignKey: 'aeronave_id',
            as: 'vuelos'
        });

        Vuelo.belongsTo(Aeronave, {
            foreignKey: 'aeronave_id',
            as: 'aeronave'
        });*/

        // =============================================
        // RELACIONES DEL MÓDULO PERSON (Usuarios, Pilotos)
        // =============================================

        // Usuario ↔ Piloto (Un usuario puede ser piloto)
       /* Usuario.hasOne(Piloto, {
            foreignKey: 'usuario_id',
            as: 'piloto'
        });

        Piloto.belongsTo(Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        });

        // Piloto ↔ Vuelo (Un piloto tiene muchos vuelos)
        Piloto.hasMany(Vuelo, {
            foreignKey: 'piloto_id',
            as: 'vuelos'
        });

        Vuelo.belongsTo(Piloto, {
            foreignKey: 'piloto_id',
            as: 'piloto'
        });*/

        // =============================================
        // =============================================
        // RELACIONES DEL MÓDULO MANTENIMIENTO
        // =============================================

        // TipoMantenimiento ↔ Mantenimiento
        TipoMantenimiento.hasMany(Mantenimiento, {
            foreignKey: 'tipo_mantenimiento_id',
            as: 'mantenimientos'
        });

        Mantenimiento.belongsTo(TipoMantenimiento, {
            foreignKey: 'tipo_mantenimiento_id',
            as: 'tipo_mantenimiento'
        });

       /* // Aeronave ↔ Mantenimiento
        Aeronave.hasMany(Mantenimiento, {
            foreignKey: 'aeronave_id',
            as: 'mantenimientos'
        });

        Mantenimiento.belongsTo(Aeronave, {
            foreignKey: 'aeronave_id',
            as: 'aeronave'
        });*/

        // =============================================
        // RELACIONES DEL MÓDULO MIEMBRO
        // =============================================

        // Usuario ↔ Miembro (Un usuario puede ser miembro)
        /*Usuario.hasOne(Miembro, {
            foreignKey: 'usuario_id',
            as: 'miembro'
        });

        Miembro.belongsTo(Usuario, {
            foreignKey: 'usuario_id',
            as: 'usuario'
        });

        // Miembro ↔ Vuelo (Un miembro puede tener vuelos)
        Miembro.hasMany(Vuelo, {
            foreignKey: 'miembro_id',
            as: 'vuelos'
        });

        Vuelo.belongsTo(Miembro, {
            foreignKey: 'miembro_id',
            as: 'miembro'
        });*/

        console.log('Todas las relaciones configuradas correctamente');

    } catch (error) {
        console.error('Error configurando relaciones:', error);
        throw error;
    }
};

