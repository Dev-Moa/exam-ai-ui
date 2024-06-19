<script setup>
import { ref, onMounted } from "vue";
import { useFetch } from "@/composables/useFetch.js";
import { useToast } from "vue-toastification";

const toast = useToast()


// http variables
const g_responseData = ref(null);
const g_loading = ref(false);
const g_error = ref(null);
const g_status = ref(null);

// function to fetch student marks
const fetchStudentMarks = async () => {
    g_loading.value = true;
    try {
        const { data, error, statusCode, isFetching } = await useFetch('marks/').get().json();
        if (error.value) {
            g_error.value = error.value;
        } else {
            // update variables
            g_responseData.value = data.value;
            g_loading.value = isFetching.value;
        }
    } catch (err) {
        g_error.value = err.message;
    }
    g_loading.value = false;
};

// on mount, fetch student marks
onMounted(async ()=>{
    await fetchStudentMarks()
});

// formData
const formData = ref({
    student_name: "",
    book_name: "",
    final_score: "",
    incorrect_answers_count:""
});



// http variables
const responseData = ref(null);
const loading = ref(false);
const error = ref(null);
const status = ref(null);

// handleSubmit
const handleSubmit = async () => {
    loading.value = true;
    console.log(formData);
    try {
        const { data, error: fetchError, statusCode } = await useFetch('marks/')
            .post(formData.value)
            .json();

        // updated values
        responseData.value = data.value;
        error.value = fetchError;
        status.value = statusCode.value;

        if (statusCode.value !== 201) {
            toast.error("Failed to save")
        } else {
            toast.success("Succeeded to save")
            await fetchStudentMarks()
        }

    } catch (error) {
        toast.error(`Record Failed ${error}`, {
            timeout: 2000
        });
    }
    finally {
        loading.value = false;
    }
};


// download 
const handleDownload = async () => {
    try {
        const url = "http://127.0.0.1:8000/download/";
        const token = localStorage.getItem('auth_token');
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            toast.error(`Download Failed: ${errorData.detail || 'Unknown error'}`);
        } else {
            const blob = await response.blob();
            const downloadUrl = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = downloadUrl;
            a.download = 'marks.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(downloadUrl);

            toast.success("File Downloaded successfull")
        }
    } catch (err) {
        error.value = err.message;
        loading.value = false;
    }
};


// update
let modal = ref(false)
// formData
const update_formData = ref({
    id:null,
    student_name: "",
    book_name: "",
    final_score: "",
    incorrect_answers_count:""
});

// modal data
const handleModal = (data)=>{
    update_formData.value.id = data.id
    update_formData.value.student_name = data.student_name,
    update_formData.value.book_name = data.book_name,
    update_formData.value.final_score = data.final_score,
    update_formData.value.incorrect_answers_count = data.incorrect_answers_count
}

const handleUpdate = async ()=>{
    console.log(update_formData.value);
    try {
        const {statusCode,error} = await useFetch(`marks/${update_formData.value.id}`).put(update_formData.value).json()
        if (error.value) {
            toast.error(`Failed to update ${error.value}`)
        }else {
            toast.success('Successfully updated')
            await fetchStudentMarks();
        }
    } catch (error) {
        console.log(error.message);
    }
}

// delete
const handleDelete = async (id) => {
    try {
        const response = await useFetch(`marks/${id}`).delete().json();
        const { statusCode, error } = response;

        console.log('Delete response:', response);
        console.log('Status Code:', statusCode.value);
        console.log('Error:', error.value);
        if (statusCode.value !== 204) {
            toast.error("Failed to Delete");
            if (error.value) {
                console.error("Delete error:", error.value);
            }
        } else {
            toast.success("Successfully deleted");
            await fetchStudentMarks();
        }
    } catch (error) {
        toast.error(`Delete failed: ${error.message}`);
    }
};



</script>

<template>
    <div class="space-y-8">
        <h1 class="text-2xl font-bold mt-4">Exam Marks</h1>
        <!-- forms -->
        <form @submit.prevent="handleSubmit" class="grid sm:grid-cols-3 gap-4">
            <!-- Form Group -->
            <div>
                <label for="Marks" class="block text-md mb-2">Student Name</label>
                <input v-model="formData.student_name" required type="text" id="stdName" name="stdName"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <!-- Form Group -->
            <div>
                <label for="subject" class="block text-md mb-2">Subject</label>
                <input v-model="formData.book_name" required type="text" id="subject" name="subject"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <!-- Form Group -->
            <div>
                <label class="block text-md mb-2">Final Score</label>
                <input v-model="formData.final_score" required type="text" 
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <!-- Form Group -->
            <div>
                <label for="Marks" class="block text-md mb-2">Incorrect Answers Count</label>
                <input v-model="formData.incorrect_answers_count" required type="text"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <button type="submit"
                class="w-1/2 h-12 p-1 mt-8 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Record</button>
        </form>
        <!-- table -->
        <div>
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <div class="float-end my-2">
                                <button @click="handleDownload" type="button"
                                    class="inline-flex items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">Download
                                    Csv</button>
                            </div>
                            <table v-if="g_responseData"
                                class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>

                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Student Name</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Subject </th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Final Score</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Incorrect Answers count</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Action</th>
                                    </tr>

                                </thead>

                                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                    <tr v-for="data in g_responseData" :key="data.id">
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                                            {{ data.student_name }}</td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                                            {{ data.book_name }}</td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md text-gray-800 dark:text-neutral-200">
                                            {{ data.final_score }}</td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md text-gray-800 dark:text-neutral-200">
                                            {{ data.incorrect_answers_count }}</td>
                                        
                                        <td class="px-6 py-4 whitespace-nowrap text-end text-md font-medium"  @click="handleModal(data)">
                                            <button type="button"
                                                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                               @click="modal = !modal">
                                                Update
                                            </button>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-end text-md font-medium">
                                            <button type="button" @click="handleDelete(data.id)"
                                                class="inline-flex bg-red-500 py-3 px-4 items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent disabled:opacity-50 disabled:pointer-events-none text-white">Delete
                                                 </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal -->
        <!-- add inputs for update and also id for the specific instance to update -->
        <div v-if="modal" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                <h2 class="text-2xl font-bold mb-4">Update </h2>
                <form action="">
                    <!-- Form Group -->
                    <div>
                        <label for="std" class="block text-md mb-2">Student Name</label>
                        <input v-model="update_formData.student_name" required type="text" id="std" name="std"
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                    <!-- Form Group -->
                    <div>
                        <label  class="block text-md mb-2">Subject</label>
                        <input v-model="update_formData.book_name" required type="text" 
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                    <!-- Form Group -->
                    <div>
                        <label class="block text-md mb-2">Final Score</label>
                        <input v-model="update_formData.final_score" required type="text" 
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                    <!-- Form Group -->
                    <div>
                        <label class="block text-md mb-2">Incorrect Answers Count</label>
                        <input v-model="update_formData.incorrect_answers_count" required type="text" 
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                </form>
                <div class="flex justify-end gap-4 my-4">
                    <button @click="handleUpdate"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Update</button>
                    <button @click="modal = !modal"
                        class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Close</button>
                </div>
            </div>
        </div>

    </div>
</template>