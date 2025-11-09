DROP TABLE IF EXISTS base;

-- Crear tabla BASE (actualizada según el modelo Sequelize)
CREATE TABLE base (
                      id SERIAL PRIMARY KEY,
                      nombre VARCHAR(100) NOT NULL UNIQUE,
                      ciudad VARCHAR(100) NOT NULL,
                      pais VARCHAR(100) NOT NULL,
                      direccion VARCHAR(255),
                      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM base;


-- Tabla PERSONA
CREATE TABLE PERSONA (
                         codigo VARCHAR(50) PRIMARY KEY,
                         nombre VARCHAR(100) NOT NULL,
                         base_nombre VARCHAR(100) NOT NULL,
                         FOREIGN KEY (base_nombre) REFERENCES BASE(nombre)
);

-- Tabla PILOTO
CREATE TABLE PILOTO (
                        codigo_piloto VARCHAR(50) PRIMARY KEY,
                        horas_vuelo INT NOT NULL DEFAULT 0,
                        FOREIGN KEY (codigo_piloto) REFERENCES PERSONA(codigo)
);

-- Tabla Miembro
CREATE TABLE MIEMBRO (
                         codigo_miembro VARCHAR(50) PRIMARY KEY,
                         FOREIGN KEY (codigo_miembro) REFERENCES PERSONA(codigo)
);

-- Tabla AVIÓN
CREATE TABLE AVION (
                       codigo VARCHAR(50) PRIMARY KEY,
                       tipo VARCHAR(100) NOT NULL,
                       base_nombre VARCHAR(100) NOT NULL,
                       FOREIGN KEY (base_nombre) REFERENCES BASE(nombre)
);

-- Tabla VUELO
CREATE TABLE VUELO (
                       num_vuelo VARCHAR(50) PRIMARY KEY,
                       origen VARCHAR(100) NOT NULL,
                       destino VARCHAR(100) NOT NULL,
                       hora TIME NOT NULL,
                       fecha DATE NOT NULL,
                       avion_codigo VARCHAR(50) NOT NULL,
                       piloto_codigo VARCHAR(50) NOT NULL,
                       FOREIGN KEY (avion_codigo) REFERENCES AVION(codigo),
                       FOREIGN KEY (piloto_codigo) REFERENCES PILOTO(codigo_piloto)
);

-- Tabla TRIPULACIÓN_VUELO
CREATE TABLE TRIPULACION_VUELO (
                                   num_vuelo VARCHAR(50),
                                   codigo_miembro VARCHAR(50),
                                   PRIMARY KEY (num_vuelo, codigo_miembro),
                                   FOREIGN KEY (num_vuelo) REFERENCES VUELO(num_vuelo),
                                   FOREIGN KEY (codigo_miembro) REFERENCES MIEMBRO(codigo_miembro)
);



DROP TABLE IF EXISTS TRIPULACION_VUELO;
DROP TABLE IF EXISTS VUELO;
DROP TABLE IF EXISTS PILOTO;
DROP TABLE IF EXISTS MIEMBRO;
DROP TABLE IF EXISTS AVION;
DROP TABLE IF EXISTS PERSONA;
DROP TABLE IF EXISTS BASE;


select * from base;