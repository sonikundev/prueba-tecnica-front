<template>
  <ButtonVue 
    icon="pi pi-pen-to-square" 
    severity="secondary"
    size="small" 
    @click="openDialog"
  />

  <DialogVue 
    v-model:visible="visible" 
    modal 
    header="Editar Producto" 
    :closable="false"
    :style="{ width: '25rem' }"
    @hide="resetForm"
  >
    <div class="grid border-round bg-gray-50 py-3">

      <!-- Nombre -->
      <div class="col-12">
        <div class="inputText">
          <span class="pi pi-box" style="font-size: 12px;"></span>
          Nombre del producto:
        </div>
        <InputTextVue 
          v-model="formData.title"
          size="small"
          placeholder="..."
          class="w-full"
        />
        <small v-if="isSubmitted && errors.title" class="p-error">
          <span class="pi pi-exclamation-circle icon-bounce" style="font-size: 12px;"></span>
          {{ errors.title }}
        </small>
      </div>

      <!-- Descripción -->
      <div class="col-12">
        <div class="inputText">
          <span class="pi pi-list" style="font-size: 12px;"></span>
          Descripción del producto:
        </div>
        <TextareaVue 
          v-model="formData.description"
          size="small"
          rows="3" 
          cols="30" 
          placeholder="..."
          class="w-full"
          autoResize
        />
        <small v-if="isSubmitted && errors.description" class="p-error">
          <span class="pi pi-exclamation-circle icon-bounce" style="font-size: 12px;"></span>
          {{ errors.description }}
        </small>
      </div>

      <!-- Estado -->
      <div class="col-12">
        <div class="inputText">
          <span class="pi pi-chart-bar" style="font-size: 12px;"></span>
          Estado del producto:
        </div>
        <SelectVue 
          v-model="formData.status"
          :options="selectedStatus"
          optionLabel="name" 
          placeholder="..."
          size="small"
          class="w-full"
        >
          <template #value="slotProps">
            <span v-if="slotProps.value">{{ slotProps.value.name }}</span>
            <span v-else>{{ slotProps.placeholder }}</span>
          </template>

          <template #option="slotProps">
            <TagVue
              :severity="slotProps.option.value === 'active' ? 'success' : 'danger'"
            >
              <div class="flex align-items-center justify-content-center gap-1">
                <span
                  :class="[
                    'pi',
                    slotProps.option.value === 'active' ? 'pi-check' : 'pi-times',
                    'textTag'
                  ]"
                ></span>
                <span class="textTag">{{ slotProps.option.name }}</span>
              </div>
            </TagVue>
          </template>
        </SelectVue>
        <small v-if="isSubmitted && errors.status" class="p-error">
          <span class="pi pi-exclamation-circle icon-bounce" style="font-size: 12px;"></span>
          {{ errors.status }}
        </small>
      </div>

      <!-- Precio -->
      <div class="col-12">
        <div class="inputText">
          <span class="pi pi-money-bill" style="font-size: 12px;"></span>
          Precio del producto:
        </div>
        <InputNumberVue 
          v-model="formData.price" 
          placeholder="0.00"
          inputId="integeronly" 
          prefix="$"
          fluid 
          size="small"
        />
        <small v-if="isSubmitted && errors.price" class="p-error">
          <span class="pi pi-exclamation-circle icon-bounce" style="font-size: 12px;"></span>
          {{ errors.price }}
        </small>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex align-items-center justify-content-center gap-2 pt-5">
      <ButtonVue
        icon="pi pi-times"
        type="button"
        label="Cerrar"
        size="small"
        text
        severity="secondary"
        @click="onClose"
      />

      <ButtonVue
        icon="pi pi-save"
        type="button"
        label="Guardar cambios"
        size="small"
        @click="onSave"
        :disabled="loading"
      >
        <template #icon>
          <i v-if="loading" class="pi pi-spin pi-spinner"></i>
          <i v-else class="pi pi-save"></i>
        </template>
      </ButtonVue>
    </div>
  </DialogVue>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useToast } from "primevue/usetoast";
import { updateProduct } from "../../services/product";

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
const toast = useToast();
const emit = defineEmits(["refresh", "product-updated"]);

const visible = ref(false);
const isSubmitted = ref(false);
const loading = ref(false);

const selectedStatus = ref([
  { name: "Activo", value: "active" },
  { name: "Inactivo", value: "inactive" },
]);

const formData = reactive({
  title: "",
  description: "",
  status: null as { name: string; value: string } | null,
  price: null as number | null,
});

const errors = reactive({
  title: "",
  description: "",
  status: "",
  price: "",
});

const maxTitleLength = 25;
const maxDescriptionLength = 70;

const openDialog = () => {
  formData.title = props.dataTableData.title;
  formData.description = props.dataTableData.description;
  formData.status =
    selectedStatus.value.find((s) => s.value === props.dataTableData.status) ||
    null;
  formData.price = Number(props.dataTableData.price);

  visible.value = true;
};

const validateForm = () => {
  let valid = true;

  if (!formData.title.trim()) {
    errors.title = "El nombre es obligatorio.";
    valid = false;
  } else if (formData.title.length > maxTitleLength) {
    errors.title = `El nombre no puede exceder ${maxTitleLength} caracteres.`;
    valid = false;
  } else {
    errors.title = "";
  }

  if (!formData.description.trim()) {
    errors.description = "La descripción es obligatoria.";
    valid = false;
  } else if (formData.description.length > maxDescriptionLength) {
    errors.description = `La descripción no puede exceder ${maxDescriptionLength} caracteres.`;
    valid = false;
  } else {
    errors.description = "";
  }

  errors.status = formData.status ? "" : "Selecciona un estado.";
  if (!formData.status) valid = false;

  const priceRegex = /^\d{1,8}(\.\d{1,2})?$/;
  if (formData.price === null || formData.price <= 0) {
    errors.price = "El precio es obligatorio y debe ser mayor a 0.";
    valid = false;
  } else if (!priceRegex.test(formData.price.toString())) {
    errors.price = "Máximo 8 enteros y 2 decimales (ej: 99999999.99).";
    valid = false;
  } else {
    errors.price = "";
  }

  return valid;
};

const onSave = async () => {
  isSubmitted.value = true;
  if (!validateForm()) return;

  loading.value = true;

  const payload = {
    title: formData.title.trim(),
    description: formData.description.trim(),
    status: formData.status?.value,
    price: formData.price!.toString(), 
  };

  try {
    await updateProduct(props.dataTableData.id, payload);

    toast.add({
      severity: "success",
      summary: "Producto actualizado",
      detail: `Se actualizó correctamente "${formData.title}"`,
      life: 8000,
    });

    emit("refresh");
    emit("product-updated", { id: props.dataTableData.id, ...payload });
    visible.value = false;
    resetForm();
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error al actualizar",
      detail: "No se pudo actualizar el producto. Intenta nuevamente.",
      life: 8000,
    });
  } finally {
    loading.value = false;
  }
};

const onClose = () => {
  visible.value = false;
  resetForm();
};

const resetForm = () => {
  Object.assign(formData, {
    title: "",
    description: "",
    status: null,
    price: null,
  });
  (Object.keys(errors) as (keyof typeof errors)[]).forEach(
    (key) => (errors[key] = "")
  );
  isSubmitted.value = false;
  loading.value = false;
};
</script>

<style scoped>
.inputText {
  font-size: 13px;
}
.p-error {
  color: red;
  font-size: 12px;
}
</style>
