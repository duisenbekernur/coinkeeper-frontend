<script lang="ts">
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      isInputOpen: false,
      name: ''
    }
  },
  methods: {
    ...mapActions({
      addCategory: 'category/addCategory'
    })
  }
}
</script>

<template>
  <div>
    <div
      class="px-5 py-2 rounded-3xl border-2 border-emerald-600"
      :class="{ 'cursor-pointer': !this.isInputOpen }"
    >
      <div v-if="this.isInputOpen" class="flex items-center gap-2">
        <input
          v-model="this.name"
          class="text-2xl text-emerald-700 bg-none rounded p-1 w-36"
          placeholder="name"
          type="text"
        />
        <img
          class="w-8 cursor-pointer"
          @click="addCategory(name)"
          src="@/assets/img/plus.png"
          alt=""
        />
      </div>
      <p class="text-2xl text-emerald-700" v-else @click="this.isInputOpen = !this.isInputOpen">
        +
      </p>
    </div>
  </div>
</template>
