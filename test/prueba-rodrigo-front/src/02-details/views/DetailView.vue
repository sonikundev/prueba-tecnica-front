
<template>
<div class="m-5 fade-in">

  <loadingTable v-if="isInitialLoad && isLoading" :show="true" />

  <DataTableVue
  v-else 
  v-model:filters="filters"
  :value="productsArray"
  paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"
  size="small"
  showGridlines
  :sortField="'createdAt'"
  :sortOrder="-1"
  tableStyle="min-width: 50rem">

  <template #header>
      <div class="grid flex align-items-center justify-content-between">

        <div class="col-12 sm:col-12 md:col-2 lg:col-2 xl:col-2 textTable flex align-items-center justify-content-center">
          Productos
        </div>

        <div class="col-12 sm:col-12 md:col-8 lg:col-8 xl:col-8">
          <IconFieldVue>
              <InputIconVue>
                  <i class="pi pi-search" />
              </InputIconVue>
              <InputTextVue 
              v-model="filters['global'].value" 
              placeholder="Buscar" 
              size="small"
              class="w-full"
              />
          </IconFieldVue>
        </div>

        <div class="col-12 sm:col-12 md:col-2 lg:col-2 xl:col-2 flex align-items-center justify-content-center">
          <addProductDialog @refresh="loadProducts"/>
        </div>

      </div>
  </template>

  <template #empty> 
    <div class="grid border-round bg-gray-50 m-3">
      <div class="col-12 flex align-items-center justify-content-center gap-1">
        <span class="pi pi-ban"></span>
        <p>Sin Resultados</p>
      </div>
    </div>
  </template>

  <template #loading> 
    <loadingState :show="isLoading" /> 
  </template>

  <ColumnVue field="title" header="Nombre" sortable>
      <template #body="slotProps">
        <div class="textTable flex align-items-center justify-content-start gap-1"
        :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
        >
          <span>{{ slotProps.data.title }}</span>
        </div>
      </template>

      <template #filter="{ filterModel, filterCallback }">
          <InputTextVue 
          v-model="filterModel.value" 
          type="text" @input="filterCallback()" 
          placeholder="Search by name" 
          />
      </template>
  </ColumnVue>

  <ColumnVue field="description" header="Description" sortable>
      <template #body="slotProps">
        <div class="textTable"
        :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
        >
          <span>{{ slotProps.data.description }}</span>
        </div>
      </template>
  </ColumnVue>

  <ColumnVue field="status" header="Estado" sortable>
      <template #body="slotProps">
        <div v-if="slotProps.data.status === 'active'">
          <TagVue
          severity="success"
          class="w-full"
          :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
          >
              <div class="flex align-items-center justify-content-center gap-1">
                <span class="pi pi-check textTag"></span>
                <span class="textTag">Activo</span>
              </div>
          </TagVue>
        </div>

        <div v-else-if="slotProps.data.status === 'inactive'">
          <TagVue
          severity="danger"
          class="w-full"
          :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
          >
              <div class="flex align-items-center justify-content-center gap-1">
                <span class="pi pi-times textTag"></span>
                <span class="textTag">Inactivo</span>
              </div>
          </TagVue>
        </div>

        <div v-else>
          <TagVue
          severity="secondary"
          class="w-full"
          :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
          >
              <div class="flex align-items-center justify-content-center gap-1">
                <span class="pi pi-times textTag"></span>
                <span class="textTag">Desconocido</span>
              </div>
          </TagVue>
        </div>

      </template>
  </ColumnVue>

  <ColumnVue field="price" header="Precio" sortable>
      <template #body="slotProps">
        <TagVue
          severity="success"
          class="w-full"
          :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
          >
            <div class="flex align-items-center justify-content-center gap-1">
              <span class="pi pi-dollar textTag"></span>
              <span class="textTag">{{ slotProps.data.price}}</span>
            </div>
        </TagVue>
      </template>
  </ColumnVue>

  <ColumnVue field="createdAt" header="Fecha de creación" sortable>
      <template #body="slotProps">
        <TagVue
        severity="secondary"
        class="w-full"
        :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
        >
            <div class="flex align-items-center justify-content-center gap-1">
              <span>{{ formatDate(slotProps.data.createdAt) }}</span>
            </div>
        </TagVue>
      </template>
  </ColumnVue>

  <ColumnVue field="updatedAt" header="Fecha de actualización" sortable>
      <template #body="slotProps">
        <TagVue
        severity="secondary"
        class="w-full"
        :class="[
          'textTable flex align-items-center justify-content-start gap-1 transition-all transition-duration-300',
          highlightedRowId === slotProps.data.id ? 'text-blue-500 fade-in' : ''
        ]"
        >
            <div class="flex align-items-center justify-content-center gap-1">
              <span>{{ formatDate(slotProps.data.updatedAt) }}</span>
            </div>
        </TagVue>

      </template>
  </ColumnVue>

  <ColumnVue>
      <template #body="slotProps">
       <div class="flex align-items-center justify-content-between gap-2">

        <editProductDialog 
        :dataTableData="slotProps.data"
        @product-updated="onProductUpdated" 
        @refresh="loadProducts"/>

        <deleteProductDialog 
        :dataTableData="slotProps.data" 
        @refresh="loadProducts"/>

       </div>
      </template>
  </ColumnVue>

  </DataTableVue>

</div>

<ToastVue/>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from '@primevue/core/api';
import { useToast } from 'primevue/usetoast'; 
import type { getAllProductsArray } from '../interfaces/getAllProducts';
import { getAllProducts } from '../services/product';
import loadingState from '../../00-global/components/animations/loadingState.vue';
import loadingTable from '../components/animations/loadingTable.vue';
import addProductDialog from '../components/dialogs/addProductDialog.vue';
import editProductDialog from '../components/dialogs/editProductDialog.vue';
import deleteProductDialog from '../components/dialogs/deleteProductDialog.vue'

const toast = useToast();

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const productsArray = ref<getAllProductsArray[]>([])
const isLoading = ref<boolean>(false);
const isInitialLoad = ref<boolean>(true);

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

const loadProducts = async () => {
  try {
    isLoading.value = true;
    productsArray.value = (await getAllProducts()) || [];
  } catch (error) {
    console.error('Error al cargar productos:', error);
    toast.add({
      severity: 'error',
      summary: 'Error al cargar los productos',
      detail: error,
      life: 8000,
    });
  } finally {
    isLoading.value = false;
    if (isInitialLoad.value) isInitialLoad.value = false;
  }
};

const highlightedRowId = ref<string | null>(null)

const highlightRow = (id: string) => {
  highlightedRowId.value = id
  setTimeout(() => {
    highlightedRowId.value = null
  }, 2000)
}

const updateLocalProduct = (updatedProduct: getAllProductsArray) => {
  const index = productsArray.value.findIndex(p => p.id === updatedProduct.id)
  if (index !== -1) {
    productsArray.value[index] = updatedProduct
    highlightRow(updatedProduct.id)
  }
}

const onProductUpdated = (updatedProduct: getAllProductsArray) => {
  updateLocalProduct(updatedProduct);
};

onMounted(loadProducts);

</script>

<style scoped>

.textTable{
  font-size: 14px;
}

.textTag{
  font-size: 12px;
}

</style>