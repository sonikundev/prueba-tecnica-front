
<template>
<div class="flex flex-column min-h-screen">
    <NavbarDetail/>

    <div class="flex-1 border-round bg-gray-100 m-2 overflow-auto">
    <RouterView />
    </div>
</div>   

</template>

<script setup lang="ts">
import NavbarDetail from './00-global/components/navigation/NavbarDetail.vue'

console.log(import.meta.env.VITE_API_URL)

</script>

