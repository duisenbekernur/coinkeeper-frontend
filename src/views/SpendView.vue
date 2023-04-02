<script setup lang="ts">
import ContentHeader from '@/components/ContentHeader.vue'
import BankCard from '@/components/BankCard.vue'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import type { IFullCard } from '@/types/card.interface'
import { useForm } from 'vee-validate'
import { OrderService } from '@/services/order.service'
import type { ElText } from 'element-plus'
import type { ICategory } from '@/types/category.interface'
import { CategoryService } from '@/services/category.service';
import { CardService } from '@/services/card.service';

const categoryColors = ['red-500', 'emerald-500', 'blue-500', 'yellow-500', 'orange-500']

const store = useStore()

const amount = ref('')
const comment = ref('')
// const cards = reactive<IFullCard[]>(store.state.cards.cards)
// const categories = reactive<ICategory[]>(store.state.categories.categories)
const cards = reactive<{ data: IFullCard[] }>({ data: [] })
const categories = reactive<{ data: ICategory[] }>({ data: [] })
const selectedCardId = ref()
const selectedCategoryIds = ref([])
const isLoading = ref(false)

const { handleSubmit } = useForm()

const onSubmit = handleSubmit(async () => {
  const data = {
    comment: comment.value,
    amount: +amount.value,
    cardName: cards.data[cards.data.findIndex((i) => i.id === selectedCardId.value)].name,
    cardId: selectedCardId.value,
    categoryIds: selectedCategoryIds.value
  }

  console.log(data)

  isLoading.value = true
  const res = await OrderService.addOrder(data)
  isLoading.value = false
})

const toggleCategoryIds = (id: number) => {
  if (selectedCategoryIds.value.some((n) => n === id)) console.log('ok')

  for (let i = 0; i < selectedCategoryIds.value.length; i++) {
    if (selectedCategoryIds.value[i] === id) {
      selectedCategoryIds.value.splice(i, 1)
      console.log(selectedCategoryIds.value)
      return
    }
  }

  selectedCategoryIds.value.push(id)
  console.log(selectedCategoryIds.value)
}

const checkBorder = (index) => {
  return selectedCategoryIds.value.includes(index)
}

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
          v-for="(card, index) in cards.data"
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
      <ElInput v-model="amount" placeholder="Amount" class="max-w-lg mb-2" />

      <p class="text-lg">Choose the category of the spend:</p>
      <section class="flex flex-wrap gap-2 md:gap-4 mb-8">
        <div
          v-for="(category, index) in categories.data"
          :key="index"
          class="px-5 py-2 rounded-3xl cursor-pointer"
          :class="[
            `bg-${categoryColors[index % categoryColors.length]}`,
            { 'border-gray-600 border-4': checkBorder(category.id) }
          ]"
          @click="toggleCategoryIds(category.id)"
        >
          <p class="text-xl text-white">{{ category.name }}</p>
        </div>
        <!-- <AddBankCardTemplateVue /> -->
      </section>

      <p class="text-lg">What did you spend on?</p>
      <input
        v-model="comment"
        placeholder="Comment"
        class="p-3 rounded-sm border border-gray-200 mb-3"
      />

      <ElButton v-if="!isLoading" type="primary" native-type="submit"> Submit </ElButton>
      <ElButton v-else type="primary">...</ElButton>
    </form>
  </main>
</template>
