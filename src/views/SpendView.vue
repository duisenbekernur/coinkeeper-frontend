<script lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import { mapActions, mapState, useStore } from 'vuex'
import { useForm } from 'vee-validate'
import type { ElText } from 'element-plus'
import * as yup from 'yup'
import { Field, Form, ErrorMessage } from 'vee-validate'

export default {
  components: { ContentHeader, Form, Field, ErrorMessage },
  data() {
    const schema = yup.object({
      // selectedCard: yup.string().required('Choose your credit card'),
      comment: yup.string().required('Comment is required field!'),
      // choosenCategories: yup.array().required(),
      amount: yup.number().required('Amount is required field!').typeError('A number is required')
    })

    return {
      schema,
      amount: 0,
      comment: '',
      selectedCardId: null,
      selectedCategoryIds: [],
      isLoading: false
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
      await this.addOrder(data)
      this.isLoading = false
      this.$toast.success('Success')
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
    <ContentHeader title="New transaction" class="mb-4" />

    <Form
      @submit="onSubmit"
      :validation-schema="schema"
      v-slot="{ errors }"
      class="flex flex-col w-80"
    >
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
      <span class="text-red-500 mb-2">{{ errors.selectedCard }}</span>

      <p class="text-lg">How much will you spend?</p>
      <Field
        v-model.number="amount"
        placeholder="Amount"
        class="max-w-lg mb-2 px-4 py-2 border border-gray-300 rounded-lg"
        name="amount"
      />
      <span class="text-red-500 mb-2">{{ errors.amount }}</span>

      <p class="text-lg">Choose the category of the spend:</p>
      <section class="flex flex-wrap gap-2 md:gap-4 mb-8 w-full">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="px-5 py-2 rounded-3xl cursor-pointer text-white bg-blue-400"
          :class="[{ 'border-gray-600 border-4': checkBorder(category.id) }]"
          @click="toggleCategoryIds(category.id)"
        >
          <p class="text-xl text-white">{{ category.name }}</p>
        </div>
      </section>

      <p class="text-lg">What did you spend on?</p>
      <Field
        v-model="comment"
        placeholder="Comment"
        class="p-3 rounded-sm border border-gray-200 mb-3"
        name="comment"
      />
      <span class="text-red-500 mb-2">{{ errors.comment }}</span>

      <ElButton v-loading="this.isLoading" type="primary" native-type="submit" size="large">
        Submit
      </ElButton>
    </Form>
  </main>
</template>
