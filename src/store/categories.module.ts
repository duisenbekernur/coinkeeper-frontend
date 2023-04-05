import type { Module } from 'vuex'
import type { RootState } from '@/store/types'
import type { ICategory } from '@/types/category.interface'
import { CategoryService } from '@/services/category.service'

export interface CategoriesState {
  categories: ICategory[]
}

const categoriesModule: Module<CategoriesState, RootState> = {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    setCategories(state, categories: ICategory[]) {
      state.categories = categories
    },
    addCategory(state, category: ICategory) {
      state.categories.push(category)
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      const categories: ICategory[] = await CategoryService.getCategories()
      commit('setCategories', categories)
    },
    async addCategory({ commit }, name) {
      const { data } = await CategoryService.addCategory({ name })
      commit('addCategory', data.category)
    }
  },
  getters: {
    getCategories: (state) => state.categories
  }
}

export default categoriesModule
