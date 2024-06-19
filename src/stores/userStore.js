import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

export  const useUserStore = defineStore('user', () => {
    const name = ref('')  // Initializing name as an empty string
    const isLogged = ref(false)  // Initializing isLogged as false
    // Function to log the user out
    function logOut() {
        isLogged.value = false
        localStorage.removeItem('auth_token')
        router.push({name:'home'})
    }

    return { name, isLogged, logOut }
})
