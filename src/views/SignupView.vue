<script setup>
import Navbar from '@/components/Navbar.vue';
import Bg from '@/components/Bg.vue';
import Footer from '@/components/Footer.vue';
// import { useFetch } from '@/composables/useFetch.js';
import { useFetch } from '@vueuse/core';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

const toast = useToast()
const router = useRouter();

const formData = ref({
    username: '',
    email: '',
    password: ''
})

const passwordError = ref('');

// Password validation function
const validatePassword = () => {
    const password = formData.value.password;
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(password)) {
        passwordError.value = 'Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.';
    } else {
        passwordError.value = '';
    }
}

// http varriables
const responseData = ref(null);
const loading = ref(false);
const error = ref(null);
const status = ref(null)
const url = "https://exam-ai-api.up.railway.app/auth/users/"

const handleSubmit = async () => {
    validatePassword();
    if (passwordError.value) {
        return;
    }
    loading.value = true
    try {
        const { isFetching, data, error,statusCode } = await useFetch(url).post(formData.value).json()
        
        if(error.value){
            toast.error(`Failed ${error}`)
        }else {
            toast.success('Signup Success ')
            loading.value = isFetching
            responseData.value = data
            error.value = error
            status.value = statusCode
            router.push({name:'login'})
        }

    } catch (err) {
        error.value = err.message;
        toast.error(`Failed ${error}`)
    } finally {
        loading.value = false;
    }
}
</script>

<template>
    <div class="max-w-[75rem] flex flex-col mx-auto size-full">
        <!-- ========== HEADER ========== -->
        <Navbar />
        <Bg />
        <!-- ========== MAIN CONTENT ========== -->
        <main id="content">
            <div class="px-[15%] md:px-[25%] py-[5%]">
                <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <div class="p-4 sm:p-7">
                        <div class="text-center">
                            <h1 class="block text-2xl font-bold text-gray-800">Sign up</h1>
                            <p class="mt-2 text-sm text-gray-600">
                                Already have an account?
                                <a class="text-blue-600 decoration-2 hover:underline font-medium">
                                    <RouterLink to="/login">Sign in here</RouterLink>
                                </a>
                            </p>
                        </div>

                        <div class="mt-5">
                            <!-- Form -->
                            <form @submit.prevent="handleSubmit">
                                <div class="grid gap-y-4">
                                    <!-- Form Group -->
                                    <div>
                                        <label for="email" class="block text-sm mb-2">Email address</label>
                                        <div class="relative">
                                            <input v-model="formData.email" type="email" id="email" name="email"
                                                class="py-3 px-4 border shadow-sm block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                required aria-describedby="email-error" />
                                            <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg class="size-5 text-red-500" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                      
                                    </div>
                                    <!-- End Form Group -->
                                   
                                    <!-- Form Group -->
                                    <div>
                                        <label for="username" class="block text-sm mb-2">
                                            Username</label>
                                        <div class="relative">
                                            <input v-model="formData.username" type="text" id="username" name="username"
                                                class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                required aria-describedby="username-error" />
                                            <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                                                <svg class="size-5 text-red-500" width="16" height="16"
                                                    fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                    <path
                                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- End Form Group -->

                                    <!-- Form Group -->
                                    <div>
                                        <label for="password" class="block text-sm mb-2">Password</label>
                                        <div class="relative">
                                            <input v-model="formData.password" type="password" id="password"
                                                name="password"
                                                class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                                @input="validatePassword" required aria-describedby="password-error" />
                                        </div>
                                        <p v-if="passwordError" class="text-xs text-red-600 mt-2">{{ passwordError }}</p>
                                    </div>
                                    <!-- End Form Group -->
                                    
                                    <!-- State : Loading or Error -->
                                    <div>
                                       <p v-if="loading" class="text-xs text-red-600 mt-2" >
                                            loading ...
                                        </p>
                                        <p v-if="error" class="text-xs text-red-600 mt-2" >
                                            {{ error }}
                                        </p>
                                        
                                    </div>
                                    <button type="submit"
                                        class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                        Sign up
                                    </button>
                                </div>
                            </form>
                            <!-- End Form -->
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- ========== FOOTER ========== -->
        <footer class="mt-auto text-center py-5">
            <Footer />
        </footer>
    </div>
</template>

