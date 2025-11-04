<template>
<MenubarVue :model="items" class="py-0">

    <template #item="{ item }">
        <div
            class="p-1 cursor-pointer flex align-items-center"
            style="font-size: 14px;"
            @click="item.command"
            :class="{ 'active-item': route.path === item.route }"
        >
            <span :class="item.icon" style="font-size: 12px;" class="mr-1"></span>
            <span>{{ item.label }}</span>
        </div>
    </template>

    <template #end>
    <div class="flex items-center gap-2">
        <p v-if="isHomeRoute">
        <TagVue severity="secondary" class="w-full fade-in2">
            <div class="flex align-items-center justify-content-center gap-1">
            <span class="pi pi-building-columns" style="font-size: 12px"></span>
            <span style="font-size: 12px">Total de productos: {{ store.totalProducts }}</span>
            </div>
        </TagVue>
        </p>
        <p v-else>
        <TagVue severity="secondary" class="w-full fade-in2">
            <div class="flex align-items-center justify-content-center gap-1">
            <span class="pi pi-book" style="font-size: 12px"></span>
            <span style="font-size: 12px">Catálogo de productos</span>
            </div>
        </TagVue>
        </p>
    </div>
    </template>
</MenubarVue>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useProductsStore } from "../../../01-monitoring/stores/useProductsStore";

const router = useRouter();
const route = useRoute();
const store = useProductsStore();

const items = ref([
{
    label: "Monitoreo",
    icon: "pi pi-chart-bar",
    route: "/",
    command: () => router.push("/"),
},
{
    label: "Detalle",
    icon: "pi pi-table",
    route: "/detail",
    command: () => router.push("/detail"),
},
]);

const isHomeRoute = computed(() => route.path === "/");
</script>

<style scoped lang="scss">

.active-item {
background-color: var(--p-info-color);
color: #4aa0e6;
border-radius: 6px;
transition: 0.2s;
}
.active-item:hover {
background-color: var(--p-info-hover-color, #f3f4f6);
transition: 0.2s;
}

</style>
  