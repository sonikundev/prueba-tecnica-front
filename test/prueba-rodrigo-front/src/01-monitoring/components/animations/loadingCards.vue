<template>
<div v-if="show" class="fade-in">
    <div class="flex flex-column min-h-screen bg-white border-round">
        <section class="grid p-1">
            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
            </div>

            <div class="col-12 sm:col-6 md:col-6 lg:col-3 xl:col-3">
                <SkeletonVue width="100%" height="10rem"></SkeletonVue>
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