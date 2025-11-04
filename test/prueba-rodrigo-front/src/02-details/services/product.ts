import { AxiosError } from 'axios'
import { api } from '@/services/api'
import type { getAllProductsArray } from '../interfaces/getAllProducts'

const handleApiError = (error: unknown, context: string) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status
    const message = error.response?.data?.message || error.message

    switch (status) {
      case 400:
        console.error(`[${context}] Error 400: Solicitud inválida →`, message)
        throw new Error('Solicitud inválida. Verifica los datos enviados.')
      case 401:
        console.error(`[${context}] Error 401: No autorizado →`, message)
        throw new Error('No autorizado. Inicia sesión nuevamente.')
      case 403:
        console.error(`[${context}] Error 403: Acceso denegado →`, message)
        throw new Error('Acceso denegado. No tienes permisos para esta acción.')
      case 404:
        console.error(`[${context}] Error 404: Recurso no encontrado →`, message)
        throw new Error('El recurso solicitado no existe.')
      case 500:
        console.error(`[${context}] Error 500: Error interno del servidor →`, message)
        throw new Error('Error interno del servidor. Inténtalo más tarde.')
      default:
        console.error(`[${context}] Error inesperado (${status}) →`, message)
        throw new Error('Ocurrió un error inesperado. Inténtalo más tarde.')
    }
  } else {
    console.error(`[${context}] Error desconocido →`, error)
    throw new Error('Error desconocido en la conexión con el servidor.')
  }
}

export const getAllProducts = async (): Promise<getAllProductsArray[] | undefined> => {
  try {
    const res = await api.get('/products')
    return res.data
  } catch (error) {
    handleApiError(error, 'getAllProducts')
    return undefined
  }
}

export const getProductById = async (id: string): Promise<getAllProductsArray | undefined> => {
  try {
    const res = await api.get(`/products/${id}`)
    return res.data
  } catch (error) {
    handleApiError(error, 'getProductById')
    return undefined
  }
}

export const createProduct = async (
  product: Omit<getAllProductsArray, 'id' | 'createdAt' | 'updatedAt'>
): Promise<getAllProductsArray | undefined> => {
  try {
    const res = await api.post('/products', product)
    return res.data
  } catch (error) {
    handleApiError(error, 'createProduct')
    return undefined
  }
}

export const updateProduct = async (
  id: string,
  product: Partial<getAllProductsArray>
): Promise<getAllProductsArray | undefined> => {
  try {
    const res = await api.put(`/products/${id}`, product)
    return res.data
  } catch (error) {
    handleApiError(error, 'updateProduct')
    return undefined
  }
}

export const deleteProduct = async (id: string): Promise<{ message: string } | undefined> => {
  try {
    const res = await api.delete(`/products/${id}`)
    return res.data
  } catch (error) {
    handleApiError(error, 'deleteProduct')
    return undefined
  }
}
