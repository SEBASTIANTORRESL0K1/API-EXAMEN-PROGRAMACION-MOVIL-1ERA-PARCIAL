CREATE DATABASE IF NOT EXISTS app_lugares;

USE app_lugares;

CREATE TABLE IF NOT EXISTS lugares_visitados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_visita DATE NOT NULL,
    imagen_url VARCHAR(255) NOT NULL
);
