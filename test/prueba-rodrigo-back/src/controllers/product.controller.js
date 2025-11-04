import * as Product from '../models/product.model.js'
import { randomUUID } from 'crypto'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts()
    res.json(products)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message })
  }
}

export const getProduct = async (req, res) => {
  try {
    const product = await Product.getProductById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener producto', error: err.message })
  }
}

export const createProduct = async (req, res) => {
  try {
    const id = randomUUID()
    await Product.createProduct({ id, ...req.body })
    res.status(201).json({ message: 'Producto creado', id })
  } catch (err) {
    res.status(500).json({ message: 'Error al crear producto', error: err.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const result = await Product.updateProduct(req.params.id, req.body)
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json({ message: 'Producto actualizado' })
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto', error: err.message })
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const result = await Product.deleteProduct(req.params.id)
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' })
    res.json({ message: 'Producto eliminado' })
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err.message })
  }
}
