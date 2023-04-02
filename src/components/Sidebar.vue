<script setup lang="ts">
import { reactive, ref } from 'vue'
import { CoHamburgerMenu } from 'oh-vue-icons/icons'
import { removeFromStorage } from '@/services/auth/auth.helper'
import { useRouter } from 'vue-router'
import { getLocalStorage } from '@/utils/local-storage'

interface ISideItem {
  name: string
  route: string
}

const router = useRouter()

const isMobileMenuOpen = reactive(false)
const activeSideItem = reactive({
  value: getLocalStorage('active-menu')
})
const sideItems: ISideItem[] = [
  { name: 'Profile', route: '/profile' },
  { name: 'Home', route: '/' },
  { name: 'Spend', route: '/spend' }
]

const handleLogout = () => {
  removeFromStorage()
  router.push('/login')
}

const handleChangeMenu = (index: number) => {
  localStorage.setItem('active-menu', index)
  activeSideItem.value = index
}
</script>

<template>
  <!-- Sidebar -->
  <aside class="flex justify-center min-h-screen bg-sky-900 text-neutral-500 w-64 p-7">
    <CoHamburgerMenu v-if="isMobileMenuOpen" />
    <div class="flex flex-col items-center relative">
      <router-link to="/" class="text-white font-semibold md:text-3xl text-2xl tracking-widest mb-5"
        >CoinKeeper</router-link
      >
      <ul>
        <li
          v-for="(item, index) in sideItems"
          class="mb-3 md:text-2xl text-xl"
          :class="{ 'text-white': activeSideItem.value === index }"
          @click="handleChangeMenu(index)"
        >
          <router-link :to="item.route">
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <button
        class="absolute bottom-6 text-xl md:text-2xl text-white left-0 right-0 ml-auto mr-auto px-5 py-1 rounded bg-rose-500 hover:bg-rose-400 transition cursor-pointer"
        @click="handleLogout"
      >
        <p>Log out</p>
      </button>
    </div>
  </aside>
</template>
