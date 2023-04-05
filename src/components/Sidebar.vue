<script lang="ts">
import { removeFromStorage } from '@/services/auth/auth.helper'
import { getLocalStorage } from '@/utils/local-storage'
import { Icon } from '@iconify/vue'
import { mapMutations, mapState } from 'vuex'

interface ISideItem {
  name: string
  route: string
  icon: string
}

export default {
  components: {
    Icon
  },
  data() {
    return {
      sideItems: [
        { name: 'Profile', route: '/profile', icon: 'material-symbols:home-app-logo' },
        { name: 'Home', route: '/', icon: 'iconoir:profile-circle' },
        { name: 'Spend', route: '/spend', icon: 'ph:money' }
      ] as ISideItem[]
    }
  },
  methods: {
    ...mapMutations({
      changeMenu: 'sideMenu/changeMenu'
    }),
    handleLogout() {
      removeFromStorage()
      // localStorage.clear()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState({
      activeSideIndex: (state) => state.sideMenu.activeMenu
    })
  }
}
</script>

<template>
  <!-- Sidebar -->
  <aside class="flex justify-center h-screen fixed bg-gray-100 text-neutral-400 w-64 p-7">
    <div class="flex flex-col items-center relative">
      <router-link to="/" class="text-black font-semibold md:text-3xl text-2xl tracking-widest mb-5"
        >CoinKeeper</router-link
      >
      <ul class="w-full">
        <li
          v-for="(item, index) in this.sideItems"
          class="mb-3 md:text-2xl text-xl rounded-lg"
          :class="{ 'text-white bg-purple-400': this.activeSideIndex === index }"
          @click="this.changeMenu(index)"
        >
          <router-link :to="item.route" class="flex items-center gap-2 py-3 px-8">
            <Icon :icon="item.icon" />
            {{ item.name }}
          </router-link>
        </li>
      </ul>

      <button
        class="absolute bottom-0 text-xl md:text-2xl text-neutral-400 px-5 py-2 rounded transition cursor-pointer hover:bg-slate-200"
        @click="handleLogout"
      >
        <p class="flex items-center gap-2">
          <Icon :icon="'majesticons:logout-half-circle'" color="gray" width="25" /> Log out
        </p>
      </button>
    </div>
  </aside>
</template>
