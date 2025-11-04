<template>
<div
    class="flex flex-column justify-content-between border-round bg-white shadow-1 p-3 transition-duration-200 hover:shadow-3"
    style="min-height: 160px;"
>
    <div class="text-center">
        <span class="pi pi-box" style="font-size: 30px; color:gray;"></span>
    <div>

    </div>
    <p class="font-semibold text-sm text-color flex align-items-center gap-2">
        <i
        class="pi pi-circle-fill text-xs"
        :class="props.productData.status === 'active' ? 'text-green-500' : 'text-red-500'"
        ></i>
        <span>{{ truncateText(props.productData.title, 25) }}</span>
    </p>

    <p class="text-xs text-color-secondary line-height-2 mt-1 mb-0 text-justify">
        {{ truncateText(props.productData.description, 70) }}
    </p>
    </div>

    <div class="flex justify-content-center align-items-center">

    <template v-if="props.productData.priceVariation !== undefined">
        <p class="text-lg font-bold text-green-600 m-0">
        ${{ props.productData.priceVariation }}
        </p>
    </template>

    <template v-else>
        <loadingState :show="true" />
    </template>

    </div>
</div>

</template>
  
<script setup lang="ts">
import loadingState from '../../00-global/components/animations/loadingState.vue'
import type { getAllProductsArray } from '../../02-details/interfaces/getAllProducts';

interface Props {
  productData: getAllProductsArray;
}

const props = defineProps<Props>();

function truncateText(text: string, maxLength: number = 50): string {
  if (!text) return ''
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text
}

</script>

<style scoped>

.firstText {
    font-size: 14px;
}

.descText {
    font-size: 11px;
    color: gray;
    white-space: normal;   
    word-wrap: break-word;   
    overflow-wrap: anywhere;
}

.priceText {
    font-size: 18px;
}

</style>