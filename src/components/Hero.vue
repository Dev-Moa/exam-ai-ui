<script setup>
import dashboard from "@/assets/dashboard.png"
</script>

<template>
    <!-- Hero -->

    <div class="overflow-hidden">
        <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 ">
            <div class="relative mx-auto max-w-4xl grid space-y-5 sm:space-y-10">
                <!-- Title -->
                <div class="text-center">
                    <h1 class="text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight">
                        Revolutionize Your Exams
                    </h1>
                    <p class="my-4 ">Streamline your exams with AI-powered generation, correction, and management  <br/> for accuracy and efficiency.</p>
                </div>
                <!-- End Title -->

                <!-- picture -->

                <div class="border w-full shadow-lg rounded">
                    <img class="w-full max-w-full" :src="dashboard" alt="">
                </div>
            </div>
        </div>
    </div>
    <!-- End Hero -->
</template>
