-- Migrations will appear here as you chat with AI

create table base (
                      base_codigo text primary key,
                      nombre text unique not null,
                      ciudad text not null,
                      pais text not null,
                      codigo_iata char(3) unique,
                      activo boolean default true,
                      created_at timestamp default current_timestamp,
                      updated_at timestamp default current_timestamp
);

create table persona (
                         persona_codigo text primary key,
                         nombre text not null,
                         base_codigo text not null,
                         activo boolean default true,
                         created_at timestamp default current_timestamp,
                         updated_at timestamp default current_timestamp,
                         foreign key (base_codigo) references base (base_codigo) on delete restrict
);

create table piloto (
                        piloto_codigo text primary key,
                        horas_vuelo int default 0 check (horas_vuelo >= 0),
                        licencia text unique not null,
                        fecha_vencimiento_licencia date not null,
                        certificaciones text[0],
                        activo boolean default true,
                        foreign key (piloto_codigo) references persona (persona_codigo) on delete cascade,
                        constraint chk_licencia_vigente check (fecha_vencimiento_licencia > current_date)
);

create table miembro_tripulacion (
                                     miembro_codigo text primary key,
                                     cargo text,
                                     activo boolean default true,
                                     foreign key (miembro_codigo) references persona (persona_codigo) on delete cascade
);

create table avion (
                       avion_codigo text primary key,
                       tipo text not null,
                       modelo text,
                       fabricante text,
                       capacidad int not null check (capacidad > 0),
                       anio_fabricacion int,
                       base_codigo text not null,
                       estado text default 'OPERATIVO' check (
                           estado in ('OPERATIVO', 'MANTENIMIENTO', 'FUERA_SERVICIO')
                           ),
                       horas_vuelo_totales int default 0,
                       ultimo_mantenimiento date,
                       proximo_mantenimiento date,
                       activo boolean default true,
                       created_at timestamp default current_timestamp,
                       updated_at timestamp default current_timestamp,
                       foreign key (base_codigo) references base (base_codigo) on delete restrict,
                       constraint chk_anio check (
                           anio_fabricacion is null
                               or anio_fabricacion <= extract(
                                   'year'
                                   from
                                   current_date
                                                      )
                           )
);

create table tipo_mantenimiento (
                                    tipo_mantenimiento_id bigint primary key generated always as identity,
                                    nombre text unique not null,
                                    descripcion text,
                                    frecuencia_dias int,
                                    activo boolean default true
);

create table mantenimiento (
                               mantenimiento_id bigint primary key generated always as identity,
                               avion_codigo text not null,
                               tipo_mantenimiento_id bigint not null,
                               fecha_inicio date not null,
                               fecha_fin date,
                               descripcion text,
                               realizado_por text not null,
                               base_codigo text not null,
                               costo numeric(10, 2) check (costo >= 0),
                               estado text default 'PENDIENTE' check (
                                   estado in (
                                              'PENDIENTE',
                                              'EN_PROCESO',
                                              'COMPLETADO',
                                              'CANCELADO'
                                       )
                                   ),
                               observaciones text,
                               created_at timestamp default current_timestamp,
                               updated_at timestamp default current_timestamp,
                               foreign key (avion_codigo) references avion (avion_codigo) on delete restrict,
                               foreign key (tipo_mantenimiento_id) references tipo_mantenimiento (tipo_mantenimiento_id),
                               foreign key (base_codigo) references base (base_codigo),
                               constraint chk_fechas_mantenimiento check (
                                   fecha_fin is null
                                       or fecha_fin >= fecha_inicio
                                   )
);

create table vuelo (
                       vuelo_num text primary key,
                       origen text not null,
                       destino text not null,
                       fecha date not null,
                       hora time not null,
                       avion_codigo text not null,
                       piloto_codigo text not null,
                       estado text default 'PROGRAMADO' check (
                           estado in (
                                      'PROGRAMADO',
                                      'EN_VUELO',
                                      'COMPLETADO',
                                      'CANCELADO',
                                      'RETRASADO'
                               )
                           ),
                       hora_salida_real time,
                       hora_llegada_real time,
                       duracion_minutos int,
                       observaciones text,
                       created_at timestamp default current_timestamp,
                       updated_at timestamp default current_timestamp,
                       foreign key (avion_codigo) references avion (avion_codigo) on delete restrict,
                       foreign key (piloto_codigo) references piloto (piloto_codigo) on delete restrict,
                       constraint chk_destino_diferente check (origen <> destino),
                       constraint uk_vuelo_avion_fecha_hora unique (avion_codigo, fecha, hora),
                       constraint uk_vuelo_piloto_fecha_hora unique (piloto_codigo, fecha, hora)
);

create table tripulacion_vuelo (
                                   vuelo_num text,
                                   miembro_codigo text,
                                   rol_en_vuelo text,
                                   primary key (vuelo_num, miembro_codigo),
                                   foreign key (vuelo_num) references vuelo (vuelo_num) on delete cascade,
                                   foreign key (miembro_codigo) references miembro_tripulacion (miembro_codigo) on delete restrict
);

create table rol (
                     rol_id bigint primary key generated always as identity,
                     nombre text unique not null,
                     descripcion text,
                     activo boolean default true
);

create table usuario (
                         usuario_id bigint primary key generated always as identity,
                         username text unique not null,
                         nombre text not null,
                         email text unique not null,
                         password_hash text not null,
                         rol_id bigint not null,
                         base_codigo text,
                         activo boolean default true,
                         ultimo_acceso timestamp,
                         created_at timestamp default current_timestamp,
                         updated_at timestamp default current_timestamp,
                         foreign key (rol_id) references rol (rol_id) on delete restrict,
                         foreign key (base_codigo) references base (base_codigo) on delete set null
);

alter table usuario
    add column persona_codigo text;

alter table usuario
    add foreign key (persona_codigo) references persona (persona_codigo) on delete set null;

alter table usuario
    drop username;

alter table usuario
    drop password_hash;

alter table usuario
    drop ultimo_acceso;

select * from usuario;