import { axiosInstance } from '@/axios/axios'
import { saveToStorage } from './auth.helper'
import type { IAuthResponse, INamePassword } from '@/types/user.interface'

export const AuthService = {
	async main(type: 'login' | 'register', data: INamePassword) {
		const response = await axiosInstance<IAuthResponse>({
			url: `/auth/${type}`,
			method: 'POST',
			data
		})
		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken')

		const response = await axiosInstance.post<string, { data: IAuthResponse }>(
			'/auth/login/access-token',
			{ refreshToken }
		)

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response
	}
}