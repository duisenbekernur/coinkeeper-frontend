<script setup lang="ts">
import type { IFullCard } from '@/types/card.interface'
import { ref } from 'vue'

interface IBankCardProps {
  card: IFullCard
}

const cardProps = defineProps<IBankCardProps>()

const showCsv = ref(false)
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
          <p class="font-medium tracking-widest">{{ cardProps.card.name }}</p>
        </div>
        <img class="w-14 h-14" src="../assets/img/master-card.png" />
      </div>
      <div class="pt-1 flex justify-between">
        <div>
          <p class="font-light">Card Number</p>
          <p class="font-medium tracking-more-wider">{{ cardProps.card.number }}</p>
        </div>
        <div>
          <p class="font-light">Balance</p>
          <p class="font-medium tracking-more-wider">{{ cardProps.card.balance }}</p>
        </div>
      </div>
      <div class="pt-6 pr-6">
        <div class="flex justify-between">
          <div class="">
            <p class="font-light text-xs">Valid</p>
            <p class="font-medium tracking-wider text-sm">{{ cardProps.card.valid }}</p>
          </div>
          <div class="">
            <p class="font-light text-xs">Expiry</p>
            <p class="font-medium tracking-wider text-sm">{{ cardProps.card.expiry }}</p>
          </div>

          <div class="">
            <p class="font-light text-xs">CVV</p>
            <p
              class="font-bold tracking-more-wider text-sm cursor-pointer"
              @click="showCsv = !showCsv"
            >
              {{ showCsv ? cardProps.card.csv : '···' }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
