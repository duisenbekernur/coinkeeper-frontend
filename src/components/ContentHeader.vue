<script lang="ts">
export default {
  props: {
    title: String
  }
}
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold md:text-4xl mb-8">{{ title }}</h1>
  </div>
</template>
