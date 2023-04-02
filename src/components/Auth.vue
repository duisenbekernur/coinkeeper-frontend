<template>
  <section class="bg-amber-100">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-emerald-400">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl">
            {{ authProps.title }}
          </h1>

          <!-- FORM -->
          <form @submit.prevent="onSubmit" class="space-y-4 md:space-y-6">
            <div>
              <label for="username" class="block mb-2 text-lg font-medium text-white"
                >Your username</label
              >
              <input
                v-model="authDatas.name"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="Ernur"
              />
            </div>
            <div>
              <label for="password" class="block mb-2 text-lg font-medium text-white"
                >Password</label
              >
              <input
                v-model="authDatas.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
              />
            </div>
            <!-- <ElLoading /> -->
            <button
              type="submit"
              v-if="!isLoading"
              class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-rose-500 hover:bg-rose-400 transition"
            >
              {{ authProps.title }}
            </button>
            <ElLoading v-if="isLoading">test</ElLoading>
            <p v-if="authProps.title === 'Login'" class="text-sm font-light text-white">
              Don’t have an account yet?
              <router-link
                :to="authProps.backLink"
                class="font-medium text-primary-600 hover:underline"
                >Sign up</router-link
              >
            </p>
            <p v-if="authProps.title === 'Register'" class="text-sm font-light text-white">
              Already have an account?
              <router-link
                :to="authProps.backLink"
                class="font-medium text-primary-600 hover:underline"
                >Sign in</router-link
              >
            </p>
            <ElLoading v-if="isLoading" />
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { reactive, ref } from 'vue'
import { AuthService } from '@/services/auth/auth.service'
import { ElLoading } from 'element-plus'
import { useRouter } from 'vue-router'

interface IAuthProps {
  title: string
  backLink: string
}

const { handleSubmit } = useForm()
const router = useRouter()

const authProps = defineProps<IAuthProps>()
const authDatas = reactive({
  name: '',
  password: ''
})
const isLoading = ref(false)

const onSubmit = handleSubmit(async () => {
  try {
    isLoading.value = true
    const res = await AuthService.main(
      authProps.title === 'Login' ? 'login' : 'register',
      authDatas
    )
    localStorage.setItem('active-menu', 1)
    router.push('/')
  } catch (error) {
    isLoading.value = false
    alert('Incorrect datas')
  } finally {
    isLoading.value = false
  }
})
</script>
