<template>

<loadingCards v-if="isLoading" :show="true"/>

<div v-else-if="hasError" class="flex flex-column align-items-center justify-content-center p-6 fade-in2">
  <i class="pi pi-exclamation-triangle text-red-500" style="font-size: 2rem;"></i>
  <h3 class="mt-3 text-red-500">Error al cargar los productos</h3>
  <p class="text-color-secondary">Por favor, intenta nuevamente más tarde.</p>
</div>

<div v-else class="flex flex-wrap gap-4 justify-content-center p-4 fade-in">
    <cardStatus
      v-for="product in productsVariation"
      :key="product.id"
      :productData="product"
      class="card-item"
    />
</div>

<ToastVue/>
</template>

<script setup lang="ts">
import { useProducts } from '../composables/useProducts'
import cardStatus from '../components/cardStatus.vue'
import loadingCards from '../components/animations/loadingCards.vue'
import Toast from 'primevue/toast'

const { productsVariation, isLoading, hasError } = useProducts()
</script>

<style scoped>
.card-item {
  width: 250px;
  height: 180px; 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  border-radius: 8px;
  box-shadow: var(--surface-overlay);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  padding: 0.5rem;
}

</style>
