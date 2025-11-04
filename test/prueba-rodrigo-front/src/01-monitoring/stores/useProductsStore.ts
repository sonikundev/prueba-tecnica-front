import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const totalProducts = ref(0)

  function setTotal(count: number) {
    totalProducts.value = count
  }

  return {
    totalProducts,
    setTotal
  }
})
