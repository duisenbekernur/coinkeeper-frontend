<script lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import { mapActions, mapState, useStore } from 'vuex'
import { useForm } from 'vee-validate'
import type { ElText } from 'element-plus'

// const categoryColors =

export default {
  components: { ContentHeader },
  data() {
    return {
      amount: 0,
      comment: '',
      selectedCardId: null,
      selectedCategoryIds: [],
      isLoading: false,
      categoryColors: ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500']
    }
  },
  methods: {
    ...mapActions({
      fetchCards: 'card/fetchCards',
      fetchCategories: 'category/fetchCategories',
      addOrder: 'order/addOrder'
    }),
    async onSubmit() {
      const data = {
        comment: this.comment,
        amount: +this.amount,
        cardName: this.cards[this.cards.findIndex((i) => i.id === this.selectedCardId)].name,
        cardId: this.selectedCardId,
        categoryIds: this.selectedCategoryIds
      }
      this.isLoading = true
      this.addOrder(data)
      this.isLoading = false
    },
    toggleCategoryIds(id: number) {
      for (let i = 0; i < this.selectedCategoryIds.length; i++) {
        if (this.selectedCategoryIds[i] === id) {
          this.selectedCategoryIds.splice(i, 1)
          return
        }
      }
      this.selectedCategoryIds.push(id)
    },
    checkBorder(index) {
      return this.selectedCategoryIds.includes(index)
    }
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
  <main>
    <ContentHeader title="Spend" class="mb-4" />

    <form @submit.prevent="onSubmit" class="flex flex-col w-80">
      <ElSelect
        v-model="selectedCardId"
        class="p-0 mb-3"
        placeholder="Choose credit card"
        size="large"
      >
        <ElOption
          v-for="(card, index) in cards"
          class="flex justify-between gap-2"
          :label="card.name"
          :value="card.id"
          :key="index"
        >
          <div>{{ card.name }}</div>
          <div>{{ card.balance }} ₸</div>
        </ElOption>
      </ElSelect>

      <p class="text-lg">How much will you spend?</p>
      <ElInput v-model.number="amount" placeholder="Amount" class="max-w-lg mb-2" />

      <p class="text-lg">Choose the category of the spend:</p>
      <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="px-5 py-2 rounded-3xl cursor-pointer"
          :class="[
            `bg-${categoryColors[index % this.categoryColors.length]}`,
            { 'border-gray-600 border-4': checkBorder(category.id) }
          ]"
          @click="toggleCategoryIds(category.id)"
        >
          <p class="text-xl text-white">{{ category.name }}</p>
        </div>
      </section>

      <p class="text-lg">What did you spend on?</p>
      <input
        v-model="comment"
        placeholder="Comment"
        class="p-3 rounded-sm border border-gray-200 mb-3"
      />

      <ElButton v-if="!this.isLoading" type="primary" native-type="submit"> Submit </ElButton>
      <ElButton v-else type="primary">...</ElButton>
    </form>
  </main>
</template>
