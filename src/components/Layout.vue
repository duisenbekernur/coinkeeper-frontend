<script lang="ts">
import Sidebar from './Sidebar.vue'
export default {
  components: {
    Sidebar
  }
}
</script>

<template>
  <div class="bg-amber-100">
    <div class="flex">
      <Sidebar />
      <main class="p-3 md:p-6 w-full">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
