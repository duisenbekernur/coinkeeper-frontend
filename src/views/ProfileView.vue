<script lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import AddBankCardTemplateVue from '@/components/AddBankCardTemplate.vue'
import AddCategoryTemplate from '@/components/AddCategoryTemplate.vue'
import { onMounted } from 'vue'
import { mapActions, mapMutations, mapState, useStore } from 'vuex'
import { getLocalStorage } from '@/utils/local-storage'

export default {
  components: {
    ContentHeader,
    AddBankCardTemplateVue,
    AddCategoryTemplate,
    AddCategoryTemplate
},
  data() {
    return {
      name: getLocalStorage('user').name,
      categoryColors: ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500']
    }
  },
  methods: {
    ...mapMutations({
      addCard: 'card/addCard'
    }),
    ...mapActions({
      fetchCards: 'card/fetchCards',
      fetchCategories: 'category/fetchCategories'
    })
  },
  mounted() {
    this.fetchCards()
    this.fetchCategories()
  },
  computed: {
    ...mapState({
      cards: (state) => state.card.cards,
      categories: (state) => state.category.categories
    })
  }
}
</script>

<template>
  <div>
    <ContentHeader :title="name" class="mb-8" />

    <h2 class="text-2xl mb-4">My credit cards:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
      <BankCard v-for="(card, index) in cards" :card="card" />
      <AddBankCardTemplateVue />
    </section>

    <h2 class="text-2xl mb-4">My spent categories:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
      <div
        v-for="(category, index) in categories"
        :key="index"
        class="px-5 py-2 rounded-3xl flex justify-center items-center"
        :class="`bg-${categoryColors[index % 5]} bg-red-500`"
      >
        <p class="text-xl text-white">{{ category.name }}</p>
      </div>
      <AddCategoryTemplate />
    </section>
  </div>
</template>
