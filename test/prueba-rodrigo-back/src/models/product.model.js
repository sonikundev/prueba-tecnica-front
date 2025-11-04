import { pool } from '../config/db.js'

export const getAllProducts = async () => {
  const [rows] = await pool.query('SELECT * FROM products')
  return rows
}

export const getProductById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id])
  return rows[0]
}

export const createProduct = async (product) => {
  const { id, title, description, status, price } = product
  const [result] = await pool.query(
    'INSERT INTO products (id, title, description, status, price) VALUES (?, ?, ?, ?, ?)',
    [id, title, description, status, price]
  )
  return result
}

export const updateProduct = async (id, product) => {
  const { title, description, status, price } = product
  const [result] = await pool.query(
    'UPDATE products SET title=?, description=?, status=?, price=?, updatedAt=NOW() WHERE id=?',
    [title, description, status, price, id]
  )
  return result
}

export const deleteProduct = async (id) => {
  const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id])
  return result
}
