<template>
<div v-if="show" class="loading-container">
    <span class="loading-text">
        <i class="pi pi-spin pi-spinner-dotted" style="font-size: 2rem"></i>
    </span>
</div>
</template>

<script setup lang="ts">
    interface LoadingStateProps {
    show: boolean;
    }

    defineProps<LoadingStateProps>();
</script>

<style lang="scss" scoped>
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.loading-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
      