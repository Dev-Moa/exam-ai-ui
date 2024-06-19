<script setup>
import Logo from "@/components/Logo.vue"
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header class="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav class="relative max-w-[75rem] w-full bg-white border border-gray-200 rounded-[36px] mx-2 py-3 px-4 md:flex md:items-center md:justify-between md:py-0 md:px-6 lg:px-8 xl:mx-auto"
          aria-label="Global">
          <router-link :to="{name:'home'}">
              <div class="flex items-center justify-between">
                 <div class="flex gap-4 items-center">
                    <Logo/>
                    <a class="flex-none text-xl font-semibold " href="#" aria-label="Brand">Exam Ai</a>
                 </div>
                  <div class="md:hidden">
                      <button type="button"
                          class="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
                          data-hs-collapse="#navbar-collapse-with-animation"
                          aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                          <svg class="hs-collapse-open:hidden flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg"
                              width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <line x1="3" x2="21" y1="6" y2="6" />
                              <line x1="3" x2="21" y1="12" y2="12" />
                              <line x1="3" x2="21" y1="18" y2="18" />
                          </svg>
                          <svg class="hs-collapse-open:block hidden flex-shrink-0 size-4"
                              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                          </svg>
                      </button>
                  </div>
              </div>
          </router-link>
          <div id="navbar-collapse-with-animation"
              class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block">
              <div class="flex flex-col md:flex-row md:items-center md:justify-end py-2 md:py-0 md:ps-7">
                  <router-link :to="{name:'register'}">
                  <a class="flex items-center gap-x-2 mr-4 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 py-2 md:py-0 md:my-6 md:ps-6"
                      href="#">
                      <ion-icon style="font-size: 24px;" name="person-outline"></ion-icon>
                      Register
                      
                  </a>
                  </router-link>
                  <router-link :to="{name:'login'}">
                  <a class="flex items-center gap-x-2 mr-4 font-medium text-gray-500 hover:text-blue-600 md:border-s md:border-gray-300 py-2 md:py-0 md:my-6 md:ps-6"
                      href="#">
                      <ion-icon style="font-size: 24px;" name="log-in-outline"></ion-icon>
                      Login
                      
                  </a>
                  </router-link>
                  
              </div>
          </div>
      </nav>
  </header>
</template>
