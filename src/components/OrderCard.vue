<script lang="ts">
import type { ICategory } from '@/types/category.interface'
import type { PropType } from 'vue'

export default {
  props: {
    order: { type: Object, required: true },
    categories: { type: Array as PropType<ICategory[]>, required: true }
  },
  data() {
    return {
      currentCategories: [],
      categoryColors: ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500']
    }
  },
  mounted() {
    this.currentCategories = this.categories.filter((category) =>
      this.order.categories.find((n: number) => n === category.id)
    )
  }
}
</script>

<template>
  <div class="w-full">
    <div class="flex justify-between items-center mb-2">
      <p class="text-2xl">{{ order.comment }}</p>

      <div>
        <div
          class="px-5 py-2 rounded-3xl cursor-pointer text-white"
          :class="[`bg-${categoryColors[Math.floor(Math.random() * 5) % categoryColors.length]}`]"
          v-for="(category, index) in currentCategories"
          :key="index"
        >
          {{ category.name }}
        </div>
      </div>

      <div>
        <p class="text-xl">{{ order.amount }} ₸</p>
        <span class="text-xl text-red-600">{{ order.cardName }}</span>
      </div>
    </div>
    <hr />
  </div>
</template>
