<template>
  <section class="py-10 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-semibold text-center mb-8">Meet Our Team</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="member in teamMembers" :key="member.id" class="bg-white rounded-lg shadow-lg overflow-hidden">
          <img :src="member.image" alt="Member Image" class="w-full h-49 object-cover">
          <div class="p-6">
            <h3 class="text-lg font-semibold text-gray-800">{{ member.name }}</h3>
            <p class="text-gray-600 mt-2">{{ member.role }}</p>
            <p class="text-gray-500 mt-2">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import dev from "@/assets/team/dev.png"
import devm from "@/assets/team/devm.jpg"
import duceysane from "@/assets/team/duceysane.jpg"
import suleymaan from "@/assets/team/suleymaan.jpg"
import yusuf from "@/assets/team/yusuf.jpg"

const teamMembers = [
  
  
  {
    id: 1,
    name: 'Abdikadir Daud Ali',
    role: 'Frontend Developer',
    description: 'Abdikadir took the lead on the frontend development, crafting the user interface and integrating it seamlessly with the backend',
    image: duceysane
  },
  {
    id: 2,
    name: 'Yusuf Hussein Dahir',
    role: 'Frontend Developer',
    description: 'Yusuf crafted the user interface and ensured seamless integration with the backend, creating a user-friendly application.',
    image: yusuf
  },
  
  {
    id: 3,
    name: 'Mohamed Suleiman Mohamed',
    role: 'Backend Developer',
    description: 'implemented the server-side logic and managed database interactions, ensuring a robust backend',
    image: suleymaan
  },
  {
    id: 4,
    name: 'Mohamed Sharif Mohamed',
    role: 'Fullstack Developer',
    description: 'worked on both frontend and backend, ensuring smooth communication between the two for a cohesive application.',
    image: devm
  },
];
</script>

<style scoped>
.section {
  padding: 2.5rem 0;
}

.card img {
  object-fit: cover;
}
</style>