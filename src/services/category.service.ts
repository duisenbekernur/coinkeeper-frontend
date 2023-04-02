import { axiosInstance } from '@/axios/axios'
import type { ICategory } from '@/types/category.interface'

export const CategoryService = {
  async getCategories() {
    const response = await axiosInstance<ICategory>({
      url: 'category',
      method: 'GET'
    })
    return response.data
  },
  async addCategory(data: { name: string }) {
    const response = await axiosInstance<ICategory>({
      url: 'category',
      method: 'POST',
      data
    })
  },
  async deleteCategory(id: number) {
    const response = await axiosInstance<{ message: string }>({
      url: `category/${id}`,
      method: 'DELETE'
    })

    return response
  }
}
