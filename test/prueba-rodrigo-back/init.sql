-- Crear base de datos
CREATE DATABASE IF NOT EXISTS prueba_rodrigo;
USE prueba_rodrigo;

-- Crear tabla products
CREATE TABLE products (
  id CHAR(36) NOT NULL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'active',
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Insertar 20 productos de prueba
INSERT INTO products (id, title, description, status, price, createdAt, updatedAt) VALUES
('1', 'Batería de Litio 12V', 'Batería recargable de alta capacidad para vehículos eléctricos.', 'active', 1299.99, '2025-01-10 08:45:12', '2025-03-02 11:22:10'),
('2', 'Panel Solar 400W', 'Panel monocristalino con alta eficiencia energética.', 'active', 3899.50, '2025-01-15 10:00:00', '2025-02-01 09:15:45'),
('3', 'Cargador Portátil 20000mAh', 'Powerbank con carga rápida USB-C y PD 60W.', 'inactive', 499.00, '2024-12-20 14:10:23', '2025-01-05 12:45:11'),
('4', 'Sensor de Temperatura IoT', 'Sensor inalámbrico con conectividad WiFi y MQTT.', 'active', 299.75, '2025-02-02 09:00:00', '2025-02-20 09:10:00'),
('5', 'Controlador de Carga MPPT', 'Controlador solar inteligente con pantalla LCD.', 'active', 1899.00, '2025-01-30 11:11:11', '2025-03-05 08:00:00'),
('6', 'Motor DC 24V', 'Motor de corriente continua para aplicaciones industriales.', 'inactive', 1599.00, '2025-03-01 07:30:00', '2025-03-15 09:45:00'),
('7', 'Bomba de Agua Sumergible', 'Bomba de acero inoxidable resistente a la corrosión.', 'active', 899.99, '2025-02-10 08:10:00', '2025-02-25 11:00:00'),
('8', 'Interruptor Inteligente WiFi', 'Compatible con Alexa y Google Home.', 'active', 349.50, '2025-01-08 10:00:00', '2025-01-20 14:00:00'),
('9', 'Cámara IP Exterior', 'Cámara con visión nocturna y detección de movimiento.', 'inactive', 1099.90, '2025-02-22 12:30:00', '2025-03-01 09:30:00'),
('10', 'Monitor de Energía', 'Mide el consumo eléctrico en tiempo real.', 'active', 649.75, '2025-03-10 08:00:00', '2025-03-25 10:00:00'),
('11', 'Cable Solar 6mm', 'Cable resistente a la intemperie para sistemas fotovoltaicos.', 'active', 199.99, '2025-01-05 09:00:00', '2025-02-01 09:30:00'),
('12', 'Foco LED 10W', 'Foco de bajo consumo con luz blanca fría.', 'active', 89.99, '2025-01-11 08:00:00', '2025-01-25 12:00:00'),
('13', 'Receptor Bluetooth Industrial', 'Permite comunicación inalámbrica robusta entre dispositivos.', 'inactive', 749.99, '2025-02-14 09:00:00', '2025-02-28 09:00:00'),
('14', 'Medidor de Flujo Digital', 'Mide con precisión el flujo de líquidos en tuberías.', 'active', 1299.00, '2025-03-01 10:00:00', '2025-03-15 14:00:00'),
('15', 'Convertidor DC-DC 12V a 5V', 'Convierte voltajes para dispositivos electrónicos pequeños.', 'active', 179.99, '2025-01-17 07:00:00', '2025-02-10 11:30:00'),
('16', 'Relé de Estado Sólido', 'Relé sin partes móviles para control industrial.', 'inactive', 399.99, '2025-02-12 12:00:00', '2025-02-25 08:00:00'),
('17', 'Módulo GPS', 'Alta precisión y bajo consumo para proyectos IoT.', 'active', 599.99, '2025-01-09 08:00:00', '2025-02-01 09:00:00'),
('18', 'Control Remoto RF', 'Transmisor inalámbrico con largo alcance.', 'active', 249.99, '2025-03-05 10:30:00', '2025-03-20 09:15:00'),
('19', 'Placa Arduino Mega', 'Microcontrolador versátil para proyectos de automatización.', 'active', 899.00, '2025-01-20 10:00:00', '2025-02-10 13:30:00'),
('20', 'Sensor Ultrasónico HC-SR04', 'Sensor de distancia para robótica y automatización.', 'inactive', 99.99, '2025-03-10 12:00:00', '2025-03-28 09:00:00');
