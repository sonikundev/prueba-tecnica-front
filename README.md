# prueba-tecnica-front
Omnicloud / v0.2

# Proyecto Prueba Rodrigo

Este proyecto es un ejemplo de **stack completo** con:

- **Frontend:** Vue 3 + Vite + Axios
- **Backend:** Node.js + Express + MySQL2 + Socket.io (Para sebsockets)
- **Base de datos:** MySQL 8
- **Contenedores:** Docker + Docker Compose

Pantallas:

La pestaña de monitoreo nos muestra una copia de todos los productos con un precio variable simulando que los precios están cambiando, como si tuvieran variaciones.
-Guardamos el total de productos en store (pinia) para poderlo llamar en el navbar y ver su total.
-Utilizamos el canal WS de socket.io.

La pestaña detalle cuenta con un CRUD en una tabla donde podemos administrar los productos con información como título (nombre), descripción, precio y estado.
-Utilizamos API Rest para listar, crear, actualizar y eliminar.
-Si actualizamos,creamos o eliminamos un producto se actualiza en el WS tambien.

---

## Comandos de instalación y ejecución

1. **Clonar el repositorio**

```bash
git clone <tu-repositorio>
cd test
docker compose up --build
```

Esto construirá y levantará los contenedores de MySQL, backend y frontend.

MySQL se inicializa con datos de prueba desde init.sql. (Metí unos datos de prueba en la consulta para poder simular productos)

Estos son los puertos que deje por default:

Frontend: http://localhost:5173

Backend: http://localhost:4000/api/products

MySQL dentro del contenedor:
docker exec -it mysql_db mysql -uuser -p12345678 prueba_rodrigo

.env del back:
DB_HOST=db
DB_USER=user
DB_PASSWORD=12345678
DB_NAME=prueba_rodrigo
DB_PORT=3306
PORT=4000


.env del front:
VITE_API_URL=http://backend:4000/api
VITE_SOCKET_URL=http://backend:4000

