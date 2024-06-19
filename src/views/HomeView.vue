<script setup>
import Navbar from './../components/Navbar.vue'
import Bg from '@/components/Bg.vue';
import Hero from '@/components/Hero.vue'
import Features from '@/components/Features.vue'
import Team from "@/components/Team.vue"
import Faq from "@/components/Faq.vue"
import Footer from '@/components/Footer.vue'
</script>


<template>
  <div >
    <Bg/>
  <!-- ========== HEADER ========== -->
  <header class="mb-auto flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
    <Navbar/>
  </header>
  <!-- ========== END HEADER ========== -->

  <!-- ========== MAIN CONTENT ========== -->
  <main id="content">
    <div class="text-center py-10 px-4 sm:px-6 lg:px-8">
      <Hero/>
      <Features/>
      <Team/>
      <Faq/>
    </div>
  </main>
  <!-- ========== END MAIN CONTENT ========== -->

  <!-- ========== FOOTER ========== -->
  <Footer/>
  <!-- ========== END FOOTER ========== -->
</div>

</template>