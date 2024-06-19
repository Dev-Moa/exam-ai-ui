<script setup>
import { ref,computed,watch } from 'vue';
import { useFetch } from "@/composables/useFetch.js";
import { useToast } from "vue-toastification";

const toast = useToast();

// Form Data
const formData = ref({
    file: null,
    exam_chapters:'',
    exam_parts: [],
    each_part_question_numbers: [],
    exam_difficulty: '',
    exam_level: ''
});

// Watch the exam_parts array and update each_part_question_numbers accordingly
watch(
  () => formData.value.exam_parts,
  (newParts) => {
    formData.value.each_part_question_numbers = newParts.map((_, index) => `Part ${index + 1} : `);
  },
  { immediate: true }
);

const handleFileChange = (event) => {
    formData.value.file = event.target.files[0];
};

const handleExamDifficultyChange = (event) => {
    formData.value.exam_difficulty = event.target.value;
};

const handleExamLevelChange = (event) => {
    formData.value.exam_level = event.target.value;
};
const selectedCount = computed(() => formData.value.exam_parts.length);
console.log(selectedCount);
// HTTP variables
const responseData = ref(null);
const loading = ref(false);
const error = ref(null);
const status = ref(null);
const url = "http://127.0.0.1:8000/generate/";

const handleSubmit = async () => {
    loading.value = true;
    console.log(formData.value);
    try {
        const formDataToSubmit = new FormData();
        formDataToSubmit.append('file', formData.value.file);
        formDataToSubmit.append('exam_chapters', formData.value.exam_chapters);
        formDataToSubmit.append('exam_parts', JSON.stringify(formData.value.exam_parts));
        formDataToSubmit.append('each_part_question_numbers', formData.value.each_part_question_numbers);
        formDataToSubmit.append('exam_difficulty', formData.value.exam_difficulty);
        formDataToSubmit.append('exam_level', formData.value.exam_level);

        const token = localStorage.getItem('auth_token');
        const response = await fetch(url, {
            method: 'POST',
            body: formDataToSubmit,
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        loading.value = false;

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Generation Failed: ${errorData.detail || 'Unknown error'}`);
        } else {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'generated_exam.docx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);

            responseData.value = 'File downloaded successfully';
            status.value = response.status;
        }
    } catch (err) {
        error.value = err.message;
        loading.value = false;
    }
};
</script>


<template>
    <div class="flex flex-col ">
        <h1 class="font-bold text-2xl">Exam Generation</h1>
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="my-8" enctype="multipart/form-data">
            <div class="grid sm:grid-cols-2 gap-4">
                <!-- Form Group -->
                <div>
                    <label for="book" class="block text-md mb-2">
                        Upload file</label>

                    <input type="file" @change="handleFileChange" required name="file-input" id="book" class="block w-full border border-gray-200 shadow-sm rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                        file:bg-gray-50 file:border-0
                        file:me-4
                        file:py-3 file:px-4
                        dark:file:bg-neutral-700 dark:file:text-neutral-400">

                </div>
                <!-- End Form Group -->
                 <!-- Form Group -->
                <div>
                    <label for="each" class="block text-md mb-2">
                        Exam Chapters</label>

                    <input required placeholder="ch1,ch2 .." v-model="formData.exam_chapters" type="text" id="each" name="each"
                        class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />

                </div>
                <!-- End Form Group -->
                <!-- Form Group -->
                <div>
                    <label for="parts" class="block text-md mb-2">Exam parts</label>
                    <!-- Select -->
                    <select required v-model="formData.exam_parts" multiple
                        class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option value="True and False">True and False</option>
                        <option value="Fill In the blank Spaces">Fill In the blank Spaces</option>
                        <option value="Circle Correct Answer">Circle Correct Answer</option>
                        <option value="Direct Questions">Direct Questions</option>
                    </select>
                    <!-- End Select -->
                </div>
                <!-- End Form Group -->
                 <!-- form Group -->
                <div v-for="(part, index) in formData.exam_parts" :key="index" class="mt-4">
                <label :for="'part-' + (index + 1)" class="block text-md mb-2">
                    Part {{ index + 1 }}: Number of Questions
                </label>
                <input
                    required
                    v-model="formData.each_part_question_numbers[index]"
                    type="text"
                    :id="'part-' + (index + 1)"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                />
                </div>
                <!-- end form group -->
                
                <!-- Form Group -->
                <div>
                    <label for="difficulty" class="block text-md mb-2">
                        Exam Difficulty</label>
                    <select required @change="handleExamDifficultyChange" id="exam_difficulty"
                        class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option selected>Exam Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <!-- End Form Group -->
                <!-- Form Group -->
                <div>
                    <label for="level" class="block text-md mb-2">
                        Exam Level</label>
                    <select required @change="handleExamLevelChange" id="level"
                        class="py-3 px-4 pe-9 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                        <option selected>Exam Level</option>
                        <option value="Primary">Primary</option>
                        <option value="High School">High School</option>
                        <option value="University">University</option>
                    </select>
                </div>
                <!-- End Form Group -->
                <div>

                </div>

                <button type="submit"
                    class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                    Generate
                </button>
            </div>
        </form>
        <!-- End Form -->
        <div v-if="loading" class="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
</template>
