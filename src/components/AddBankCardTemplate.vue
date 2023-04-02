<script setup lang="ts">
import { CardService } from '@/services/card.service'
import type { ICard, IFullCard } from '@/types/card.interface'
import { reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const cardDatas = reactive<ICard>({
  balance: '',
  csv: '',
  expiry: '',
  name: '',
  number: '',
  valid: ''
})

const addBankCard = async () => {
  cardDatas.balance = +cardDatas.balance
  cardDatas.csv = +cardDatas.csv
  const response = await CardService.addCard(cardDatas)
  store.commit('cards/addCard', response.data)
}
</script>

<template>
  <div class="w-96 m-0 h-56 bg-red-100 rounded-xl relative text-white shadow-2xl transition-all">
    <img class="relative object-cover w-full h-full rounded-xl" src="../assets/img/bank-card.png" />

    <div class="w-full px-8 absolute top-8">
      <div class="flex justify-between">
        <div class="">
          <p class="font-light">Name</p>
          <ElInput v-model="cardDatas.name" placeholder="card name" />
        </div>
        <img class="w-14 h-14" src="../assets/img/master-card.png" />
      </div>
      <div class="pt-1 flex justify-between">
        <div>
          <p class="font-light">Card Number</p>
          <ElInput v-model="cardDatas.number" placeholder="card number" />
        </div>
        <div class="w-20">
          <p class="font-light">Balance</p>
          <ElInput v-model="cardDatas.balance" placeholder="card balance" />
        </div>
      </div>
      <div class="pt-6 pr-6">
        <div class="flex justify-between">
          <div class="w-14">
            <p class="font-light text-xs">Valid</p>
            <ElInput v-model="cardDatas.valid" placeholder="valid" />
          </div>
          <div class="w-14">
            <p class="font-light text-xs">Expiry</p>
            <ElInput v-model="cardDatas.expiry" placeholder="expiry" />
          </div>

          <div class="w-32 flex items-end gap-2">
            <div>
              <p class="font-light text-xs">CVV</p>
              <ElInput class="w-14" v-model="cardDatas.csv" placeholder="cvv" />
            </div>
            <ElButton @click="addBankCard" type="success">Add</ElButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
