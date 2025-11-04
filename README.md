# Prueba Técnica Frontend — Omnicloud v0.2

**Autor:** Rodrigo Martínez  
**Stack:** Vue 3 + Node.js + MySQL + Docker  
**Diseño prototipo en Figma:** [Ver diseño](https://www.figma.com/design/cXqB49LbIoFMUieJvxlPiK/prueba-rodrigo?node-id=0-1&t=ru36C1lm8ByfaZwe-1)

---

## Descripción del Proyecto

Este proyecto implementa un **stack completo** con comunicación en tiempo real y administración de datos, simulando un entorno de monitoreo y gestión de productos.

Incluye:

- **Frontend:** Vue 3 + Vite + Axios + Pinia  
- **Backend:** Node.js + Express + MySQL2 + Socket.io *(para WebSockets)*  
- **Base de datos:** MySQL 8  
- **Contenedores:** Docker + Docker Compose  

---

## Funcionalidades

### Pestaña de Monitoreo
- Muestra una **lista de productos** cuyos precios varían dinámicamente (simulación de fluctuaciones).
- Los datos se reciben mediante **Socket.io** (canal WS).
- El **total de productos** se guarda en **Pinia Store** para visualizarlo desde el *Navbar*.

### Pestaña de Detalle
- CRUD completo de productos: **crear, listar, actualizar y eliminar**.
- Cada producto contiene:
  - **Título (nombre)**
  - **Descripción**
  - **Precio**
  - **Estado**
- Cada operación del CRUD se sincroniza en tiempo real mediante el **WebSocket**, manteniendo el monitoreo actualizado.

---

## Instalación y Ejecución

### Clonar el repositorio y ejecutar el contenedor

```bash
git clone https://github.com/sonikundev/prueba-tecnica-front.git
cd test
docker compose up --build
```

### .env del front
```bash
VITE_API_URL=http://backend:4000/api
VITE_SOCKET_URL=http://backend:4000
```
### .env del back
```bash
DB_HOST=db
DB_USER=user
DB_PASSWORD=12345678
DB_NAME=prueba_rodrigo
DB_PORT=3306
PORT=4000
```

