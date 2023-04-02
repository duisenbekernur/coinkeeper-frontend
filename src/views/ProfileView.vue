<script setup lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import { onMounted, reactive, ref } from 'vue'
import type { ICard, IFullCard } from '@/types/card.interface'
import { CardService } from '@/services/card.service'
import { mapState, useStore } from 'vuex'
import { getLocalStorage } from '@/utils/local-storage'
import AddBankCardTemplateVue from '@/components/AddBankCardTemplate.vue'
import type { ICategory } from '@/types/category.interface'
import { CategoryService } from '@/services/category.service'

const store = useStore()

// store.dispatch('cards/fetchCards')
// store.dispatch('categories/fetchCategories')

// const cards = reactive<IFullCard[]>(store.state.cards.cards)
// const categories = reactive<ICategory[]>(store.state.categories.categories)
const cards = reactive<{ data: IFullCard[] }>({ data: [] })
const categories = reactive<{ data: ICategory[] }>({ data: [] })
const name = getLocalStorage('user').name

const categoryColors = ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500']

const getCards = async () => {
  const response = await CardService.getAllCards()
  cards.data = response.data
}
const getCategories = async () => {
  const response: ICategory[] = await CategoryService.getCategories()
  categories.data = response
}

onMounted(() => {
  getCards()
  getCategories()
})
</script>

<template>
  <div>
    <ContentHeader :title="name" class="mb-8" />

    <h2 class="text-2xl mb-4">My credit cards:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
      <BankCard v-for="(card, index) in cards.data" :card="card" />
      <AddBankCardTemplateVue />
    </section>

    <h2 class="text-2xl mb-4">My spent categories:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
      <div
        v-for="(category, index) in categories.data"
        :key="index"
        class="px-5 py-2 rounded-3xl"
        :class="`bg-${categoryColors[index % 5]}`"
      >
        <p class="text-xl text-white">{{ category.name }}</p>
      </div>
      <!-- <AddBankCardTemplateVue /> -->
    </section>
  </div>
</template>
