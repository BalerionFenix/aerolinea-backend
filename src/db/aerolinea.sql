-- ============================================
-- CREAR BASE DE DATOS (opcional)
-- ============================================
-- CREATE DATABASE aerolinea;
-- \c aerolinea;

-- ============================================
-- TABLA: ROLES DE USUARIO
-- ============================================
CREATE TABLE roles
(
    id     SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================
-- TABLA: USUARIOS
-- ============================================
CREATE TABLE usuarios
(
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    email      VARCHAR(100) NOT NULL UNIQUE,
    password   TEXT         NOT NULL,
    rol_id     INTEGER      NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    CONSTRAINT fk_rol FOREIGN KEY (rol_id) REFERENCES roles (id)
);

CREATE INDEX idx_usuario_email ON usuarios (email);

-- ============================================
-- TABLA: AVIONES
-- ============================================
CREATE TABLE aviones
(
    id         SERIAL PRIMARY KEY,
    modelo     VARCHAR(100) NOT NULL,
    capacidad  INTEGER      NOT NULL CHECK (capacidad > 0),
    estado     VARCHAR(50)  NOT NULL DEFAULT 'operativo', -- mantenimiento, fuera_servicio
    created_at TIMESTAMP             DEFAULT NOW()
);

-- ============================================
-- TABLA: PILOTOS
-- ============================================
CREATE TABLE pilotos
(
    id                SERIAL PRIMARY KEY,
    nombre            VARCHAR(100) NOT NULL,
    licencia          VARCHAR(50)  NOT NULL UNIQUE,
    experiencia_anios INTEGER CHECK (experiencia_anios >= 0),
    created_at        TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABLA: TRIPULACION
-- ============================================
CREATE TABLE tripulacion
(
    id         SERIAL PRIMARY KEY,
    nombre     VARCHAR(100) NOT NULL,
    cargo      VARCHAR(50)  NOT NULL, -- auxiliar, jefe de cabina, etc
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- TABLA: BASES (AEROPUERTOS)
-- ============================================
CREATE TABLE bases
(
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100)   NOT NULL,
    ciudad      VARCHAR(100)   NOT NULL,
    pais        VARCHAR(100)   NOT NULL,
    codigo_iata CHAR(3) UNIQUE NOT NULL
);

-- ============================================
-- TABLA: VUELOS
-- ============================================
CREATE TABLE vuelos
(
    id              SERIAL PRIMARY KEY,
    avion_id        INTEGER   NOT NULL,
    piloto_id       INTEGER   NOT NULL,
    base_salida_id  INTEGER   NOT NULL,
    base_destino_id INTEGER   NOT NULL,
    fecha_salida    TIMESTAMP NOT NULL,
    fecha_llegada   TIMESTAMP NOT NULL,
    estado          VARCHAR(50) DEFAULT 'programado', -- programado, en vuelo, terminado, cancelado

    CONSTRAINT fk_avion FOREIGN KEY (avion_id) REFERENCES aviones (id),
    CONSTRAINT fk_piloto FOREIGN KEY (piloto_id) REFERENCES pilotos (id),
    CONSTRAINT fk_base_salida FOREIGN KEY (base_salida_id) REFERENCES bases (id),
    CONSTRAINT fk_base_destino FOREIGN KEY (base_destino_id) REFERENCES bases (id),
    CONSTRAINT chk_fechas CHECK (fecha_llegada > fecha_salida)
);

CREATE INDEX idx_vuelo_fechas ON vuelos (fecha_salida);

-- ============================================
-- TABLA: TRIPULACIÓN ASIGNADA A VUELOS
-- ============================================
CREATE TABLE vuelo_tripulacion
(
    vuelo_id       INTEGER NOT NULL,
    tripulacion_id INTEGER NOT NULL,

    PRIMARY KEY (vuelo_id, tripulacion_id),

    CONSTRAINT fk_vuelo FOREIGN KEY (vuelo_id) REFERENCES vuelos (id) ON DELETE CASCADE,
    CONSTRAINT fk_tripulacion FOREIGN KEY (tripulacion_id) REFERENCES tripulacion (id)
);
