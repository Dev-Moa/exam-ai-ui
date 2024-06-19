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

// function to fetch user
const fetchUsers = async () => {
    g_loading.value = true;
    try {
        const { data, error, statusCode, isFetching } = await useFetch('users/').get().json();
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

// on mount, fetchusers
onMounted(fetchUsers);

// formData
const formData = ref({
    username: "",
    is_superuser:false,
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
        const { data, error: fetchError, statusCode } = await useFetch('users/')
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
            await fetchUsers()
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



// update
let modal = ref(false)
// formData
const update_formData = ref({
    id:null,
    username: "",
    is_superuser: "",
    password: ""
});

// modal data
const handleModal = (data)=>{
    update_formData.value.id = data.id
    update_formData.value.username = data.username,
    update_formData.value.is_superuser = data.is_superuser,
    update_formData.value.password = data.password
}

const handleUpdate = async ()=>{
    console.log(update_formData.value);
    try {
        const {statusCode,error} = await useFetch(`users/${update_formData.value.id}/`).put(update_formData.value).json()
        if (error.value) {
            toast.error(`Failed to update ${error.value}`)
        }else {
            toast.success('Successfully updated')
            await fetchUsers();
        }
    } catch (error) {
        console.log(error.message);
    }
}

// delete
const handleDelete = async (id) => {
    try {
        const response = await useFetch(`users/${id}`).delete().json();
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
            await fetchUsers();
        }
    } catch (error) {
        toast.error(`Delete failed: ${error.message}`);
    }
};



</script>

<template>
    <div class="space-y-8">
        <h1 class="text-2xl font-bold mt-4">Users info</h1>
        <!-- forms -->
        <form @submit.prevent="handleSubmit" class="grid sm:grid-cols-3 gap-4">
            <!-- Form Group -->
            <div>
                <label for="username" class="block text-md mb-2">Username</label>
                <input v-model="formData.username" required type="text" id="stdName" name="stdName"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <!-- Form Group -->
            <div>
                <label for="subject" class="block text-md mb-2">Is Admin</label>
                <input v-model="formData.is_superuser" type="checkbox" 
                    class="shadow-sm border py-3 px-4 block  border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <!-- Form Group -->
            <div> 
                <label for="password" class="block text-md mb-2">Password</label>
                <input v-model="formData.password" required type="text" id="password" name="password"
                    class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
            </div>
            <!-- End Form Group -->
            <button type="submit"
                class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">Record</button>
        </form>
        <!-- table -->
        <div>
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            
                            <table v-if="g_responseData"
                                class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                <thead>

                                    <tr>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Username</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            is Admin</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Update</th>
                                        <th scope="col"
                                            class="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">
                                            Delete</th>
                                    </tr>

                                </thead>

                                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                                    <tr v-for="data in g_responseData" :key="data.id">
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-800 dark:text-neutral-200">
                                            {{ data.username }}</td>
                                        <td
                                            class="px-6 py-4 whitespace-nowrap text-md text-gray-800 dark:text-neutral-200">
                                            {{ data.is_superuser }}</td>
                                        
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
                        <label for="std" class="block text-md mb-2">Username</label>
                        <input v-model="update_formData.username" required type="text" id="std" name="std"
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                    <!-- Form Group -->
                    <div>
                        <label for="subject" class="block text-md mb-2">Is Admin</label>
                        <input v-model="update_formData.is_superuser" required type="text" 
                            class="shadow-sm border py-3 px-4 block w-full border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" />
                    </div>
                    <!-- End Form Group -->
                    <!-- Form Group -->
                    <div>
                        <label  class="block text-md mb-2">Password</label>
                        <input v-model="update_formData.password" required type="text" 
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