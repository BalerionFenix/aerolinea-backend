const { sequelize } = require('../config/database');

// Importar modelos de TODOS los módulos
const Aeronave = require('../modules/base/models/Aeronave');
const Vuelo = require('../modules/base/models/Vuelo');
const Usuario = require('../modules/person/models/Usuario');
const Piloto = require('../modules/person/models/Piloto');
const Miembro = require('../modules/miembro/models/Miembro');
const { Mantenimiento, TipoMantenimiento } = require('../modules/Mantenimiento/models');

const setupAssociations = () => {
    console.log('🔗 Configurando TODAS las relaciones de modelos...');
    
    try {
        // =============================================
        // RELACIONES DEL MÓDULO BASE (Aeronaves, Vuelos)
        // =============================================
        
        // Aeronave ↔ Vuelo (Una aeronave tiene muchos vuelos)
        Aeronave.hasMany(Vuelo, {
            foreignKey: 'aeronave_id',
            as: 'vuelos'
        });

        Vuelo.belongsTo(Aeronave, {
            foreignKey: 'aeronave_id',
            as: 'aeronave'
        });

        // =============================================
        // RELACIONES DEL MÓDULO PERSON (Usuarios, Pilotos)
        // =============================================
        
        // Usuario ↔ Piloto (Un usuario puede ser piloto)
        Usuario.hasOne(Piloto, {
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
        });

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

        // Aeronave ↔ Mantenimiento
        Aeronave.hasMany(Mantenimiento, {
            foreignKey: 'aeronave_id',
            as: 'mantenimientos'
        });

        Mantenimiento.belongsTo(Aeronave, {
            foreignKey: 'aeronave_id',
            as: 'aeronave'
        });

        // =============================================
        // RELACIONES DEL MÓDULO MIEMBRO
        // =============================================
        
        // Usuario ↔ Miembro (Un usuario puede ser miembro)
        Usuario.hasOne(Miembro, {
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
        });

        console.log('✅ Todas las relaciones configuradas correctamente');
        
    } catch (error) {
        console.error('❌ Error configurando relaciones:', error);
        throw error;
    }
};

