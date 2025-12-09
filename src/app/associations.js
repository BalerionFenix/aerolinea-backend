import sequelize from "../config/config_db.js";
import Mantenimiento from "./Mantenimiento/models/Mantenimiento.js";
import TipoMantenimiento from "./Mantenimiento/models/TipoMantenimiento.js";
import Rol from "./Usuario/models/Rol.js";
import Usuario from "./Usuario/models/Usuario.js";
import Base from "./Base/models/Base.js";
import Avion from "./Base/models/Avion.js";
import Persona from "./Personal/models/Persona.js";
import Piloto from "./Personal/models/Piloto.js";
import MiembroTripulacion from "./Personal/models/MiembroTripulacion.js";

// Modelos futuros
import Vuelo from './Base/models/Vuelo.js';
import Miembro from './Personal/models/MiembroTripulacion.js';

export const setupAssociations = () => {
    console.log('Configurando TODAS las relaciones de modelos...');

    try {
        // =============================================
        // RELACIONES DEL MÓDULO USUARIO
        // =============================================

        // Rol ↔ Usuario (1:N)
        Rol.hasMany(Usuario, { foreignKey: 'rol_id', as: 'usuarios' });
        Usuario.belongsTo(Rol, { foreignKey: 'rol_id', as: 'rol' });

        // Base ↔ Usuario (1:N)
        Base.hasMany(Usuario, { foreignKey: 'base_codigo', as: 'usuarios' });
        Usuario.belongsTo(Base, { foreignKey: 'base_codigo', as: 'base' });

        // Usuario ↔ Persona (1:1 opcional)
        Usuario.belongsTo(Persona, { foreignKey: 'persona_codigo', as: 'persona' });
        Persona.hasOne(Usuario, { foreignKey: 'persona_codigo', sourceKey: 'persona_codigo', as: 'usuario' });

        // =============================================
        // RELACIONES DEL MÓDULO BASE
        // =============================================

        // Base ↔ Avion (1:N)
        Base.hasMany(Avion, { foreignKey: 'base_codigo', as: 'aviones' });
        Avion.belongsTo(Base, { foreignKey: 'base_codigo', as: 'base' });

        // Avion ↔ Mantenimiento (1:N)
        Avion.hasMany(Mantenimiento, {foreignKey: 'avion_codigo', sourceKey: 'avion_codigo', as: 'mantenimientos'});
        Mantenimiento.belongsTo(Avion, {foreignKey: 'avion_codigo', targetKey: 'avion_codigo', as: 'avion'});


        // =============================================
        // RELACIONES DEL MÓDULO PERSONAL
        // =============================================

        // Persona ↔ Piloto (1:1)
        Persona.hasOne(Piloto, { foreignKey: 'piloto_codigo', sourceKey: 'persona_codigo', as: 'piloto' });
        Piloto.belongsTo(Persona, { foreignKey: 'piloto_codigo', targetKey: 'persona_codigo', as: 'persona' });

        // Persona ↔ MiembroTripulacion (1:1)
        Persona.hasOne(MiembroTripulacion, { foreignKey: 'miembro_codigo', sourceKey: 'persona_codigo', as: 'miembro' });
        MiembroTripulacion.belongsTo(Persona, { foreignKey: 'miembro_codigo', targetKey: 'persona_codigo', as: 'persona' });

        // Usuario ↔ Miembro (1:1)
        Usuario.hasOne(Miembro, { foreignKey: 'usuario_id', as: 'miembro' });
        Miembro.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

        // Miembro ↔ Vuelo (1:N)
        Miembro.hasMany(Vuelo, { foreignKey: 'miembro_id', as: 'vuelos' });
        Vuelo.belongsTo(Miembro, { foreignKey: 'miembro_id', as: 'miembro' });

        // =============================================
        // RELACIONES DEL MÓDULO MANTENIMIENTO
        // =============================================

        // TipoMantenimiento ↔ Mantenimiento (1:N)
        TipoMantenimiento.hasMany(Mantenimiento, { foreignKey: 'tipo_mantenimiento_id', as: 'mantenimientos' });
        Mantenimiento.belongsTo(TipoMantenimiento, { foreignKey: 'tipo_mantenimiento_id', as: 'tipo_mantenimiento' });

        console.log('Todas las relaciones configuradas correctamente');
    } catch (error) {
        console.error('Error configurando relaciones:', error);
        throw error;
    }
};
