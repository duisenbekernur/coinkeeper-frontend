<script setup lang="ts">
const { title } = defineProps<{ title: string }>()
</script>

<template>
  <div>
    <h1 class="text-2xl md:text-4xl">{{ title }}</h1>
  </div>
</template>
