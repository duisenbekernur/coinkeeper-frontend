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
      categoryColors: ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500'],
      isLoadedCards: false,
      isLoadedCategories: false
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
  async created() {
    await this.fetchCards()
    this.isLoadedCards = true
    await this.fetchCategories()
    this.isLoadedCategories = true
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
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8 items-center">
      <p v-loading="!this.isLoadedCards" v-if="!this.isLoadedCards" class="text-xl font-semibold">
        Loading cards...
      </p>
      <p v-else-if="this.cards.length === 0" class="text-xl font-semibold">
        You don't have any cards. Please, add first card.
      </p>
      <BankCard
        v-if="this.cards.length > 0"
        v-for="(card, index) in cards"
        :key="card.id"
        :card="card"
      />
      <AddBankCardTemplateVue />
    </section>

    <hr class="my-8" />

    <h2 class="text-2xl mb-4">My transaction categories:</h2>
    <section class="flex flex-wrap gap-2 md:gap-4 mb-8 items-center">
      <p v-loading="!this.isLoadedCategories" v-if="!this.isLoadedCategories">Loading...</p>
      <p class="text-xl font-semibold" v-else-if="this.categories.length === 0">
        There is no categories yet
      </p>
      <div
        v-if="this.categories.length > 0"
        v-for="(category, index) in categories"
        :key="index"
        class="px-5 py-2 rounded-3xl flex justify-center items-center bg-blue-400"
      >
        <p class="text-xl text-white">{{ category.name }}</p>
      </div>
      <AddCategoryTemplate />
    </section>
  </div>
</template>
