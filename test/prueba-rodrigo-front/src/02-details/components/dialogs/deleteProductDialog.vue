<template>
  <ButtonVue 
    icon="pi pi-trash" 
    severity="danger"
    size="small" 
    text
    @click="openDialog"
  />

  <DialogVue 
    v-model:visible="visible" 
    modal 
    header="Borrar Producto" 
    :closable="false"
    :style="{ width: '25rem' }"
    @hide="resetForm"
  >
    <div class="grid border-round bg-gray-50 py-3">
      <div class="col-12 flex align-items-center justify-content-center">
        <div class="inputText text-center">
          ¿Seguro que deseas borrar el producto: 
          <strong>{{ props.dataTableData.title }}</strong>?
        </div>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex align-items-center justify-content-center gap-2 pt-5">
      <ButtonVue
        icon="pi pi-times"
        type="button"
        label="Cancelar"
        size="small"
        text
        severity="secondary"
        @click="onClose"
      />

      <ButtonVue
        icon="pi pi-trash"
        type="button"
        label="Borrar"
        size="small"
        severity="danger"
        @click="onDelete"
        :disabled="loading"
      >
        <template #icon>
          <i v-if="loading" class="pi pi-spin pi-spinner"></i>
          <i v-else class="pi pi-trash"></i>
        </template>
      </ButtonVue>
    </div>
  </DialogVue>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { deleteProduct } from "../../services/product";

interface Props {
  dataTableData: {
    id: string;
    title: string;
    description: string;
    status: string;
    price: string;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(["refresh"]);

const toast = useToast();
const visible = ref(false);
const loading = ref(false);

const openDialog = () => {
  visible.value = true;
};

const onDelete = async () => {
  loading.value = true;

  try {
    await deleteProduct(props.dataTableData.id);

    toast.add({
      severity: "success",
      summary: "Producto eliminado",
      detail: `Se eliminó correctamente "${props.dataTableData.title}"`,
      life: 8000,
    });

    emit("refresh");
    visible.value = false;
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error);

    toast.add({
      severity: "error",
      summary: "Error al eliminar",
      detail: "No se pudo eliminar el producto. Intenta nuevamente.",
      life: 8000,
    });
  } finally {
    loading.value = false;
  }
};

const onClose = () => {
  visible.value = false;
};

const resetForm = () => {
  loading.value = false;
};
</script>

<style scoped>
.inputText {
  font-size: 14px;
}
</style>
