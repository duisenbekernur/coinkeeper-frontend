<script lang="ts">
import type { IFullCard } from '@/types/card.interface'
import type { PropType } from 'vue'
import { mapActions } from 'vuex'

export default {
  props: {
    card: { type: Object as PropType<IFullCard>, required: true }
  },
  data() {
    return {
      showCsv: false
    }
  },
  methods: {
    ...mapActions({
      deleteCard: 'card/deleteCard'
    })
  }
}
</script>

<template>
  <div
    class="w-96 m-0 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transform hover:scale-105 transition-all"
  >
    <img class="relative object-cover w-full h-full rounded-xl" src="../assets/img/bank-card.png" />

    <div class="w-full px-8 absolute top-8">
      <div class="flex justify-between">
        <div class="">
          <p class="font-light">Name</p>
          <p class="font-medium tracking-widest">{{ card.name }}</p>
        </div>
        <img class="w-14 h-14" src="../assets/img/master-card.png" />
      </div>
      <div class="pt-1 flex justify-between">
        <div>
          <p class="font-light">Card Number</p>
          <p class="font-medium tracking-more-wider">{{ card.number }}</p>
        </div>
        <div>
          <p class="font-light">Balance</p>
          <p class="font-medium tracking-more-wider">{{ card.balance }}</p>
        </div>
      </div>
      <div class="pt-6 pr-6">
        <div class="flex justify-between">
          <div class="">
            <p class="font-light text-xs">Valid</p>
            <p class="font-medium tracking-wider text-sm">{{ card.valid }}</p>
          </div>
          <div class="">
            <p class="font-light text-xs">Expiry</p>
            <p class="font-medium tracking-wider text-sm">{{ card.expiry }}</p>
          </div>

          <div class="">
            <p class="font-light text-xs">CVV</p>
            <p
              class="font-bold tracking-more-wider text-sm cursor-pointer"
              @click="showCsv = !showCsv"
            >
              {{ showCsv ? card.csv : '···' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <img
      src="@/assets/img/delete.png"
      alt="delete"
      class="absolute right-3 top-3 w-7 cursor-pointer hover:scale-110"
      @click="deleteCard(card.id)"
    />
  </div>
</template>
