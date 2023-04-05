<script lang="ts">
import Sidebar from './Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>

<template>
  <div class="bg-white">
    <div class="grid grid-cols-[1fr_6.5fr] relative">
      <Sidebar />
      <div></div>
      <main class="p-3 md:px-20 md:py-12 w-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
