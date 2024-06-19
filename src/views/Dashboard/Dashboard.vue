<script setup>
import { useFetch } from "@/composables/useFetch.js";
import { ref, onMounted } from 'vue';



const user = ref({
  username:null,
  is_superuser:null
});

onMounted(async () => {
  try {
    const { data, error } = await useFetch('auth/users/me').get().json();
    if (error.value) {
      console.error('Failed to fetch user details:', error.value);
      return null;
    }
    //update values
    user.value.username = data.value.username
    user.value.is_superuser = data.value.is_superuser
  } catch (error) {
    console.error(error.message);
  }
});

</script>

<template>
  <div class="flex-1 p-10">
    <h2 class="text-xl font-medium text-gray-800 mb-6 ">Welcome Back <span class=" text-blue-600 font-bold">{{user.username}} !</span> </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <router-link :to="{ name: 'gen' }" class="block bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
        <h3 class="text-xl font-bold mb-4">Exam Generation</h3>
        <p class="text-md text-gray-600">Create and manage exams efficiently.</p>
      </router-link>
      <!-- Card 2 -->
      <router-link :to="{ name: 'corr' }" class="block bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
        <h3 class="text-xl font-bold mb-4">Exam Correction</h3>
        <p class="text-md text-gray-600">Correct and review exam answers.</p>
      </router-link>
      <!-- Card 3 -->
      <router-link :to="{ name: 'marks' }" class="block bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100">
        <h3 class="text-xl font-bold mb-4">Exam Marks</h3>
        <p class="text-md text-gray-600">View and manage exam marks.</p>
      </router-link>
      <!-- Card 4 -->
      <router-link
        v-if="user.is_superuser"
        :to="{ name: 'users' }"
        class="block bg-white p-6 rounded-lg shadow-lg hover:bg-gray-100"
      >
        <h3 class="text-xl font-bold mb-4">Users</h3>
        <p class="text-md text-gray-600">Manage user accounts and permissions.</p>
      </router-link>
    </div>
  </div>
</template>
