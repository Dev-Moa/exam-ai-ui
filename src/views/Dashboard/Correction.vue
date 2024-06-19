<script setup>
import { ref } from 'vue';
import { useFetch } from '@/composables/useFetch.js';
import { useToast } from 'vue-toastification';
import 'vue-json-pretty/lib/styles.css';

const toast = useToast();

// formData
const formData = ref({
    original_file: null,
    student_file: null
});

const handleOriginalFileChange = (event) => {
    formData.value.original_file = event.target.files[0];
};
const handleStudentFileChange = (event) => {
    formData.value.student_file = event.target.files[0];
};

// http variables
const responseData = ref(null);
const loading = ref(false);
const error = ref(null);
const status = ref(null);

// handleSubmit
const handleSubmit = async () => {
    loading.value = true;
    try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('original_file', formData.value.original_file);
        formDataToSubmit.append('student_file', formData.value.student_file);
        const { data, error: fetchError, statusCode } = await useFetch('correct/').post(formDataToSubmit).json();

        // updated values
        if (data && data.value) {
            try {
                responseData.value = data.value.response
            } catch (e) {
                console.error("Failed to parse JSON-like string:", e);
                responseData.value = null;
                toast.error("Failed to parse response");
            }
        }
        error.value = fetchError.value;
        status.value = statusCode.value;

        // console
        console.log('error', error.value);
        console.log('status', status.value);
        console.log('response', responseData.value);

    } catch (error) {
        toast.error(`Request Failed: ${error}`, {
            timeout: 2000
        });
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="mt-5">
        <h1 class="font-bold text-2xl my-4">Exam Correction</h1>
        <!-- Form -->
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="grid sm:grid-cols-2 sm:gap-8 gap-4">
                <!-- Form Group -->
                <div>
                    <label for="original-file" class="block text-lg mb-2">Original File</label>
                    <input type="file" @change="handleOriginalFileChange" required name="original-file"
                        id="original-file" class="block w-full border border-gray-200 shadow-sm rounded-lg text-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                        file:bg-gray-50 file:border-0
                        file:me-4
                        file:py-3 file:px-4
                        dark:file:bg-neutral-700 dark:file:text-neutral-400">
                </div>
                <!-- End Form Group -->
                <!-- Form Group -->
                <div>
                    <label for="student-file" class="block text-lg mb-2">Student File</label>
                    <input type="file" @change="handleStudentFileChange" required name="student-file" id="student-file"
                        class="block w-full border border-gray-200 shadow-sm rounded-lg text-lg focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                        file:bg-gray-50 file:border-0
                        file:me-4
                        file:py-3 file:px-4
                        dark:file:bg-neutral-700 dark:file:text-neutral-400">
                </div>
                <!-- End Form Group -->
                <button type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-lg font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Correct Exam
                </button>
            </div>
        </form>
        <!-- End Form -->

        <p v-if="loading">Loading ...</p>

        <!-- Response -->
        <div v-if="responseData" class="container mx-auto py-12 px-4">
            <div class="bg-white shadow-lg border rounded-lg p-6">
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Exam Review for {{ responseData.student_name }}</h2>
                <h2 class="text-2xl font-bold text-gray-800 mb-4">Exam Subject  {{ responseData.book_name }}</h2>
                <div class="mb-6">
                    <p class="text-gray-600"><strong>Final Score:</strong> {{ responseData.final_score }}</p>
                    <p class="text-gray-600"><strong>Incorrect Answers:</strong> {{ responseData.incorrect_answers }}</p>
                </div>
                <div v-if="responseData.detailed_review.length">
                    <h3 class="text-xl font-semibold text-gray-800 mb-4">Detailed Review</h3>
                    <div v-for="review in responseData.detailed_review" :key="review.question_number" class="mb-6">
                        <div class="bg-gray-50 p-4 rounded-lg shadow">
                            <p class="text-gray-600 mb-2"><strong>Question Number:</strong> {{ review.question_number }}
                            </p>
                            <p class="text-gray-600 mb-2"><strong>Status:</strong> {{ review.status }}</p>
                            <p class="text-gray-600"><strong>Correct Version:</strong> {{ review.correct_version }}</p>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-gray-600">No incorrect answers to review.</p>
                </div>
            </div>
        </div>
    </div>
</template>
