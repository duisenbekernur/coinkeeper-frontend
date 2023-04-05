import type { Module } from 'vuex'
import type { RootState } from '@/store/types'
import type { ICategory } from '@/types/category.interface'
import { CategoryService } from '@/services/category.service'
import { getLocalStorage } from '@/utils/local-storage'

export interface SideMenuState {
  activeMenu: number
}

const sideMenuModule: Module<CategoriesState, RootState> = {
  namespaced: true,
  state: {
    activeMenu: getLocalStorage('active-menu')
  },
  mutations: {
    changeMenu(state, num) {
      localStorage.setItem('active-menu', num)
      state.activeMenu = num
    }
  },
  getters: {
    getActiveMenu: (state) => state.activeMenu
  }
}

export default sideMenuModule
