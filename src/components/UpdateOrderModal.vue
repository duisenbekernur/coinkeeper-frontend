<script lang="ts">
import type { IOrder } from '@/types/order.interface'
import type { PropType } from 'vue'
import { mapActions, mapState } from 'vuex'

export default {
  props: {
    order: Object as PropType<IOrder>,
    closeModal: false
  },
  data() {
    return {
      amount: 0,
      comment: '...',
      selectedCardId: null,
      isLoading: false
    }
  },
  methods: {
    ...mapActions({
      fetchCards: 'card/fetchCards',
      updateOrder: 'order/updateOrder',
      fetchTotalBalance: 'card/fetchTotalBalance'
    }),
    async onSubmit() {
      const data = {
        comment: this.comment,
        amount: +this.amount,
        cardName: this.cards[this.cards.findIndex((i) => i.id === this.selectedCardId)].name,
        cardId: +this.selectedCardId
      }
      console.log(data)

      this.isLoading = true
      await this.updateOrder({ id: this.order.id, data })
      this.isLoading = false
      await this.fetchTotalBalance()
      this.$toast.success('Success')
    }
  },
  async created() {
    await this.fetchCards()
    this.comment = this.order?.comment
    this.amount = this.order?.amount
  },
  computed: {
    ...mapState({
      cards: (state) => state.card.cards
    })
  }
}
</script>

<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start w-full flex-col">
              <div class="flex justify-between w-full mb-3">
                <p>Comment:</p>
                <input v-model="this.comment" class="border border-gray-300 rounded-lg py-1 px-4" />
              </div>
              <div class="flex justify-between w-full mb-3">
                <p>Amount:</p>
                <input v-model="this.amount" class="border border-gray-300 rounded-lg py-1 px-4" />
              </div>
              <div class="flex justify-between w-full mb-3">
                <ElSelect
                  v-model="this.selectedCardId"
                  class="p-0 mb-3"
                  placeholder="Choose credit card"
                  size="large"
                >
                  <ElOption
                    v-for="(card, index) in this.cards"
                    class="flex justify-between gap-2"
                    :label="card.name"
                    :value="card.id"
                    :key="index"
                  >
                    <div>{{ card.name }}</div>
                    <div>{{ card.balance }} ₸</div>
                  </ElOption>
                </ElSelect>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="this.onSubmit"
              v-loading="this.isLoading"
              type="button"
              class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 sm:ml-3 sm:w-auto"
            >
              Update
            </button>
            <button
              @click="this.$emit('closeModal')"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
