import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user'
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    const steToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }
    const setUser = (obj) => {
      user.value = obj
    }
    return {
      token,
      steToken,
      removeToken,
      user,
      getUser,
      setUser
    }
  },
  {
    persist: true
  }
)
