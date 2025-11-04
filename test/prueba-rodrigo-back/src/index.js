import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import productsRouter from './routes/product.routes.js'
import { pool } from './config/db.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/products', productsRouter)

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', 
  }
})

io.on('connection', (socket) => {
  console.log(`Usuario conectado: ${socket.id}`)
  
  socket.on('disconnect', () => {
    console.log(`Usuario desconectado: ${socket.id}`)
  })
})

async function updatePrices() {
const [rows] = await pool.query('SELECT * FROM products')
console.log('Datos leídos desde MySQL:', rows[0]) 

const updatedProducts = rows.map((p) => {
    const randomVariation = parseFloat((Math.random() * 100).toFixed(2)) 
    return { 
    ...p, 
    priceVariation: randomVariation 
    }
})

io.emit('productsUpdated', updatedProducts)
}
  

setInterval(updatePrices, 1000)

const PORT = process.env.PORT || 4000
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
