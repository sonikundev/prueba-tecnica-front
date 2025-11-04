<template>
<div v-if="show" class="fade-in">
    <div class="flex flex-column min-h-screen bg-white border-round">
        <section class="p-1 flex">
            <SkeletonVue width="100%" height="1.7rem"></SkeletonVue>
        </section>
        <section class="grid p-1">
            <div class="col-12 sm:col-6 md:col-6 lg:col-2 xl:col-2">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-4 xl:col-4">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-1 xl:col-1">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-1 xl:col-1">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-1 xl:col-1">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-2 xl:col-2">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
            <div class="col-3 sm:col-6 md:col-6 lg:col-1 xl:col-1">
                <SkeletonVue width="100%" height="45rem"></SkeletonVue>
            </div>
        </section>
    </div>
</div>
</template>

<script setup lang="ts">
interface LoadingStateProps {
show: boolean;
}

defineProps<LoadingStateProps>();
</script>