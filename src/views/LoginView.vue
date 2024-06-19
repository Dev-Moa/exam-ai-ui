<script setup>
import Navbar from "./../components/Navbar.vue";
import Bg from "./../components/Bg.vue";
import Footer from "./../components/Footer.vue";
import { ref } from "vue";
import { useRouter } from 'vue-router';
import { useFetch } from "@vueuse/core";
import { useUserStore } from "@/stores/userStore.js"
import { useToast } from "vue-toastification";


// initialize user store
const userStore = useUserStore()
//toast
const toast = useToast();

const router = useRouter();

// formData
const formData = ref({
  username: "",
  password: ""
});

// http variables
const responseData = ref(null);
const loading = ref(false);
const error = ref(null);
const status = ref(null);

// handleSubmit
const handleSubmit = async () => {
  loading.value = true;
  try {
    const { data, error: fetchError, statusCode } = await useFetch(' http://127.0.0.1:8000/auth/token/login/')
      .post(formData.value)
      .json();

    // updated values
    responseData.value = data.value;
    error.value = fetchError;
    status.value = statusCode.value;

    // console.log('Status Code:', statusCode.value);
    // console.log('Data:', data.value);
    // console.log('Error:', fetchError);

    if (!fetchError.value) {
      // Accessing the auth token
      const authToken = data.value.auth_token;
      console.log('Auth Token:', authToken);
      if (authToken) {
        // Save the token in localStorage
        localStorage.setItem('auth_token', authToken);
        //Save user info to the store
        userStore.name = formData.value.username
        userStore.isLoggedIn = true
        //toast
        toast.success("Login successfull", {
        timeout: 2000
      });
        // Redirect to the home page
        router.push({ name: 'dash' });
      }
    } else {
      toast.error(`Login Failed ${fetchError.value}`, {
        timeout: 2000
      });
    }

  } catch (error) {
    
    toast.error(`Login Failed ${error}`, {
        timeout: 2000
      });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="max-w-[75rem] flex flex-col mx-auto size-full">
    <!-- Header -->
    <Navbar />
    <Bg />
    <main id="content" class="px-[15%] md:px-[25%] py-[5%]">
      <div class="mt-7 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="p-4 sm:p-7">
          <div class="text-center">
            <h1 class="block text-2xl font-bold text-gray-800">Sign in</h1>
            <p class="mt-2 text-sm text-gray-600">
              Don't have an account yet?
              <router-link :to="{ name: 'register' }">
                <a class="text-blue-600 decoration-2 hover:underline font-medium">
                  Sign up here
                </a>
              </router-link>
            </p>
          </div>

          <div class="mt-5">

            <!-- Form -->
            <form @submit.prevent="handleSubmit">
              <div class="grid gap-y-4">
                <!-- Form Group -->
                <div>
                  <label for="username" class="block text-sm mb-2">
                    Username</label>
                  <div class="relative">
                    <input v-model="formData.username" type="text" id="username" name="username"
                      class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required aria-describedby="username-error" />
                    <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                        aria-hidden="true">
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
                    <input v-model="formData.password" type="password" id="password" name="password"
                      class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      required aria-describedby="password-error" />
                    <div class="hidden absolute inset-y-0 end-0 pointer-events-none pe-3">
                      <svg class="size-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"
                        aria-hidden="true">
                        <path
                          d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p class="hidden text-xs text-red-600 mt-2" id="password-error">
                    8+ characters required
                  </p>
                </div>
                <!-- End Form Group -->

                <button type="submit"
                  class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  Sign in
                </button>
              </div>
            </form>
            <!-- End Form -->
          </div>
        </div>
      </div>
    </main>

    <!-- =========FOOTER============ -->
    <footer class="mt-auto text-center py-5">
      <Footer />
    </footer>
  </div>
</template>
