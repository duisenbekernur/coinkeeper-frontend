<template>
  <section class="bg-neutral-100">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-3xl font-bold leading-tight tracking-tight text-black md:text-4xl">
            {{ title }}
          </h1>

          <!-- FORM -->
          <Form
            @submit="onSubmit"
            :validation-schema="schema"
            v-slot="{ errors }"
            class="space-y-4 md:space-y-6"
          >
            <div>
              <!-- Username -->
              <label for="username" class="block mb-2 text-lg font-medium text-black"
                >Your username</label
              >
              <Field
                v-model="authDatas.name"
                type="text"
                name="username"
                id="username"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
                placeholder="Ernur"
              />
              <span class="text-red-500">{{ errors.username }}</span>
            </div>
            <div>
              <!-- Password -->
              <label for="password" class="block mb-2 text-lg font-medium text-black"
                >Password</label
              >
              <Field
                v-model="authDatas.password"
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 block w-full p-2.5"
              />
              <span class="text-red-500">{{ errors.password }}</span>
            </div>
            <!-- <ElLoading /> -->
            <button
              v-loading="this.isLoading"
              type="submit"
              class="w-full text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center bg-rose-500 hover:bg-rose-400 transition"
            >
              {{ title }}
            </button>
            <!-- Change route -->
            <p v-if="title === 'Login'" class="text-sm font-light text-black">
              Don’t have an account yet?
              <router-link :to="backLink" class="font-medium text-primary-600 hover:underline"
                >Sign up</router-link
              >
            </p>
            <p v-if="title === 'Register'" class="text-sm font-light text-white">
              Already have an account?
              <router-link :to="backLink" class="font-medium text-primary-600 hover:underline"
                >Sign in</router-link
              >
            </p>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import * as yup from 'yup'
import { Field, Form, ErrorMessage } from 'vee-validate'
import { ElLoading } from 'element-plus'
import { AuthService } from '@/services/auth/auth.service'
import type { PropType } from 'vue'

export default {
  props: {
    title: String,
    backLink: String
  },
  components: { Field, Form, ErrorMessage },
  data() {
    const schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required()
    })
    return {
      schema,
      authDatas: { name: '', password: '' },
      isLoading: false
    }
  },
  methods: {
    async onSubmit() {
      try {
        this.isLoading = true

        const response = await AuthService.main(
          this.title === 'Login' ? 'login' : 'register',
          this.authDatas
        )

        localStorage.setItem('active-menu', 1)
        this.$router.replace('/')
      } catch (error) {
        this.isLoading = false
        this.$toast.error('Incorrect datas')
      } finally {
        this.isLoading = false
        this.$toast.success('Success')
      }
    }
  }
}
</script>
