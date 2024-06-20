<script setup>
import { ref, onMounted } from "vue";
import { useFetch } from "@/composables/useFetch.js";
import { useRouter } from 'vue-router';
import Bg from "@/components/Bg.vue";
import Logo2 from "@/components/Logo2.vue";

const router = useRouter();
const sidebar = ref(false);
const user = ref({
  username: null,
  is_superuser: null,
});

function logOut() {
  localStorage.removeItem('auth_token');
  router.push({ name: 'home' });
}

onMounted(async () => {
  try {
    const { data, error } = await useFetch('auth/users/me').get().json();
    if (error.value) {
      console.error('Failed to fetch user details:', error.value);
      return;
    }
    // Update values
    user.value.username = data.value.username;
    user.value.is_superuser = data.value.is_superuser;
  } catch (err) {
    console.error('Error fetching user details:', err.message);
  }
});
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header
    class="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-md py-2.5 sm:py-4 lg:ps-64">
    <nav class="flex basis-full items-center w-full mx-auto px-4 sm:px-6" aria-label="Global">
      <div class="me-5 lg:me-0 lg:hidden">
        <!-- Logo mobile -->
        <div class="flex items-center">
          <svg class="w-12 h-12 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h1 class="font-bold text-lg text-blue-500">Exam Ai</h1>
        </div>
        <!-- End Logo -->
      </div>
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->

  <!-- ========== MAIN CONTENT ========== -->
  <!-- Breadcrumb -->
  <div class="sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 md:px-8 lg:hidden">
    <div class="flex justify-between items-center py-2">
      <!-- Breadcrumb -->
      <ol class="ms-3 flex items-center whitespace-nowrap">
        <li class="flex items-center text-md text-gray-800">
          Application Layout
          <svg class="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </li>
        <li class="text-md font-semibold text-gray-800 truncate" aria-current="page">
          Dashboard
        </li>
      </ol>
      <!-- End Breadcrumb -->

      <!-- Sidebar -->
      <button type="button" @click="sidebar = !sidebar" class="py-2 px-3 flex justify-center items-center gap-x-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:text-gray-600" aria-controls="application-sidebar" aria-label="Sidebar">
        <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13" />
        </svg>
        <span class="sr-only">Sidebar</span>
      </button>
      <!-- End Sidebar -->
    </div>
  </div>
  <!-- End Breadcrumb -->

  <!-- Sidebar -->
  <div :class="{ 'hidden lg:block': !sidebar, 'block': sidebar }"
    class="fixed top-0 start-0 bottom-0 z-[60] w-64 bg-blue-600 pt-7 pb-10 overflow-y-auto transition-all duration-300 transform lg:translate-x-0">
    <router-link :to="{ name: 'admin' }">
      <div class="px-6 flex items-center gap-x-4">
        <Logo2 />
        <a class="flex-none text-xl font-semibold text-white" href="#" aria-label="Brand">Exam ai</a>
      </div>
    </router-link>

    <nav class="p-6 w-full flex flex-col">
      <ul class="space-y-1.5">
        <router-link :to="{ name: 'gen' }" class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-md text-white rounded-lg" active-class="border">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19.428 15.518A2.5 2.5 0 0117.5 18h-11a2.5 2.5 0 01-1.928-4.482A2.5 2.5 0 015.5 10h11a2.5 2.5 0 011.928 4.482z">
            </path>
          </svg>
          <li>Exam Generation</li>
        </router-link>
        <router-link :to="{ name: 'corr' }" class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg text-white" active-class="border">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          <li>Exam Correction</li>
        </router-link>
        <router-link :to="{ name: 'marks' }" class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg text-white" active-class="border">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5h4M7 10h10m-9 5h8"></path>
          </svg>
          <li>Exam Marks</li>
        </router-link>
        <router-link v-if="user.is_superuser" :to="{ name: 'users' }" class="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-md rounded-lg text-white" active-class="border">
          <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h10m-7 4h4"></path>
          </svg>
          <li>Users</li>
        </router-link>
      </ul>
      <button @click="logOut" class="mx-3 bg-white p-3 rounded mt-[15rem] text-blue-600 font-medium">Logout</button>
    </nav>
  </div>
  <!-- End Sidebar -->

  <!-- Content -->
  <div class="w-full lg:ps-64">
    <div class="p-4 sm:p-6 space-y-4 sm:space-y-6">
      <Bg />
      <RouterView />
    </div>
  </div>
  <!-- ========== END MAIN CONTENT ========== -->
</template>
