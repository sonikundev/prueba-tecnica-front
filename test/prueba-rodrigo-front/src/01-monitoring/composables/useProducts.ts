import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import { getAllProducts } from '../../02-details/services/product'
import { socket } from '../services/socket'
import { useProductsStore } from '../stores/useProductsStore'
import type { getAllProductsArray } from '../../02-details/interfaces/getAllProducts'

export function useProducts() {
  const productsVariation = ref<getAllProductsArray[]>([])
  const isLoading = ref(false)
  const hasError = ref(false)
  const toast = useToast()
  const store = useProductsStore()

  let priceCheckTimeout: number | null = null
  let lastPrices: number[] = []

  const checkPrices = () => {
    const currentPrices = productsVariation.value.map(p => Number(p.price ?? 0))
    const unchanged = currentPrices.every((price, i) => price === lastPrices[i])

    if (unchanged) {
      hasError.value = true
      toast.add({
        severity: 'warn',
        summary: 'Error de precios',
        detail: 'Los precios no han cambiado en los últimos 3 segundos.',
        life: 5000
      })
    }

    lastPrices = currentPrices
  }

  const loadProducts = async () => {
    isLoading.value = true
    hasError.value = false

    try {
      const data = await getAllProducts()

      if (!data || data.length === 0) {
        hasError.value = true
        toast.add({
          severity: 'warn',
          summary: 'Sin datos',
          detail: 'No se recibieron productos desde el servidor.',
          life: 5000
        })
        return
      }

      productsVariation.value = data
      lastPrices = data.map(p => Number(p.price ?? 0))
      store.setTotal(data.length)

      socket.on('productsUpdated', (updatedProducts: getAllProductsArray[]) => {
        productsVariation.value = updatedProducts
        store.setTotal(updatedProducts.length)
      })
    } catch (error) {
      console.error('Error al cargar productos:', error)
      hasError.value = true
      toast.add({
        severity: 'error',
        summary: 'Error al cargar',
        detail: 'Ocurrió un error al obtener los productos del servidor.',
        life: 6000
      })
    } finally {
      isLoading.value = false
    }
  }

  watch(
    productsVariation,
    () => {
      if (priceCheckTimeout !== null) {
        clearTimeout(priceCheckTimeout)
      }
      priceCheckTimeout = window.setTimeout(checkPrices, 3000)
    },
    { deep: true }
  )

  onMounted(loadProducts)

  onUnmounted(() => {
    socket.off('productsUpdated')
    if (priceCheckTimeout !== null) {
      clearTimeout(priceCheckTimeout)
    }
  })

  return {
    productsVariation,
    isLoading,
    hasError,
    loadProducts
  }
}
