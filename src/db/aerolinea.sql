-- 🧹 ELIMINAR TABLAS EN ORDEN CORRECTO
DROP TABLE IF EXISTS TRIPULACION_VUELO;
DROP TABLE IF EXISTS VUELO;
DROP TABLE IF EXISTS PILOTO;
DROP TABLE IF EXISTS MIEMBRO;
DROP TABLE IF EXISTS AVION;
DROP TABLE IF EXISTS PERSONA;
DROP TABLE IF EXISTS BASE;

-- 🛠️ CREAR TABLA BASE
CREATE TABLE BASE (
                      id SERIAL PRIMARY KEY,
                      nombre VARCHAR(100) NOT NULL UNIQUE,
                      ciudad VARCHAR(100) NOT NULL,
                      pais VARCHAR(100) NOT NULL,
                      direccion VARCHAR(255),
                      estado VARCHAR(20) NOT NULL DEFAULT 'Activo',
                      "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                      "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 👤 CREAR TABLA PERSONA
CREATE TABLE PERSONA (
                         codigo VARCHAR(50) PRIMARY KEY,
                         nombre VARCHAR(100) NOT NULL,
                         base_id INT,
                         FOREIGN KEY (base_id) REFERENCES BASE(id)
                             ON DELETE SET NULL
                             ON UPDATE CASCADE
);

-- 👨‍✈️ CREAR TABLA PILOTO
CREATE TABLE PILOTO (
                        codigo_piloto VARCHAR(50) PRIMARY KEY,
                        horas_vuelo INT NOT NULL DEFAULT 0,
                        FOREIGN KEY (codigo_piloto) REFERENCES PERSONA(codigo)
                            ON DELETE CASCADE
                            ON UPDATE CASCADE
);

-- 👷‍♂️ CREAR TABLA MIEMBRO
CREATE TABLE MIEMBRO (
                         codigo_miembro VARCHAR(50) PRIMARY KEY,
                         FOREIGN KEY (codigo_miembro) REFERENCES PERSONA(codigo)
                             ON DELETE CASCADE
                             ON UPDATE CASCADE
);

-- 🛩️ CREAR TABLA AVIÓN
CREATE TABLE AVION (
                       codigo VARCHAR(50) PRIMARY KEY,
                       tipo VARCHAR(100) NOT NULL,
                       base_id INT NOT NULL,
                       FOREIGN KEY (base_id) REFERENCES BASE(id)
                           ON DELETE CASCADE
                           ON UPDATE CASCADE
);

-- ✈️ CREAR TABLA VUELO
CREATE TABLE VUELO (
                       num_vuelo VARCHAR(50) PRIMARY KEY,
                       origen VARCHAR(100) NOT NULL,
                       destino VARCHAR(100) NOT NULL,
                       hora TIME NOT NULL,
                       fecha DATE NOT NULL,
                       avion_codigo VARCHAR(50) NOT NULL,
                       piloto_codigo VARCHAR(50) NOT NULL,
                       FOREIGN KEY (avion_codigo) REFERENCES AVION(codigo)
                           ON DELETE CASCADE
                           ON UPDATE CASCADE,
                       FOREIGN KEY (piloto_codigo) REFERENCES PILOTO(codigo_piloto)
                           ON DELETE CASCADE
                           ON UPDATE CASCADE
);

-- 👨‍✈️👷‍♀️ CREAR TABLA TRIPULACIÓN_VUELO (muchos a muchos)
CREATE TABLE TRIPULACION_VUELO (
                                   num_vuelo VARCHAR(50),
                                   codigo_miembro VARCHAR(50),
                                   PRIMARY KEY (num_vuelo, codigo_miembro),
                                   FOREIGN KEY (num_vuelo) REFERENCES VUELO(num_vuelo)
                                       ON DELETE CASCADE
                                       ON UPDATE CASCADE,
                                   FOREIGN KEY (codigo_miembro) REFERENCES MIEMBRO(codigo_miembro)
                                       ON DELETE CASCADE
                                       ON UPDATE CASCADE
);

--  CONSULTA DE PRUEBA
SELECT * FROM BASE;


SELECT * FROM Usuario;


