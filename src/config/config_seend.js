
import Rol from '../app/Usuario/models/Rol.js';
import Usuario from '../app/Usuario/models/Usuario.js';
import Base from '../app/Base/models/Base.js';
export async function seed() {
    // Roles
    await Rol.findOrCreate({
        where: { nombre: 'Administrador' },
        defaults: {
            descripcion: 'Rol con acceso completo a todas las funcionalidades y configuraciones del sistema',
            activo: true
        }
    });

    await Rol.findOrCreate({
        where: { nombre: 'Usuario' },
        defaults: {
            descripcion: 'Rol con acceso limitado a las funcionalidades esenciales del sistema',
            activo: true
        }
    });

    // Base aérea
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

    // Usuario administrador
    const adminRol = await Rol.findOne({ where: { nombre: 'Administrador' } });
    const base = await Base.findOne({ where: { nombre: 'Base Aérea El Dorado' } });

    await Usuario.findOrCreate({
        where: { email: 'docente.pitter@example.com' },
        defaults: {
            nombre: 'Docente Pitter',
            rol_id: adminRol.rol_id,
        base_codigo: base.base_codigo,
        activo: false
}
});

    console.log('Datos iniciales creados o verificados.');
}

seed().catch(console.error);
