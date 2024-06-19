<template>
    <!-- FAQ -->
    <div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <!-- Grid -->
        <div class="grid md:grid-cols-5 gap-10">
            <div class="md:col-span-2">
                <div class="max-w-xs">
                    <h2 class="text-2xl font-bold md:text-4xl md:leading-tight">FAQs</h2>
                    <p class="mt-1 hidden md:block text-gray-600">Frequently asked questions about Exam AI App.</p>
                </div>
            </div>
            <!-- End Col -->

            <div class="md:col-span-3">
                <!-- Accordion -->
                <div class="hs-accordion-group divide-y divide-gray-200">
                    <div class="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                        <button
                            class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                            What is Exam AI App?
                            <svg class="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            <svg class="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-one"
                            class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                            <p class="text-gray-600">
                                Exam AI App is an AI-powered application designed to streamline the examination process,
                                including exam generation, correction, and management.
                            </p>
                        </div>
                    </div>

                    <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                        <button
                            class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                            How does Exam AI generate exams?
                            <svg class="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            <svg class="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-two"
                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                            <p class="text-gray-600">
                                Exam AI uses advanced algorithms to generate customized exams based on the parameters
                                set by the instructor, ensuring a unique and comprehensive assessment.
                            </p>
                        </div>
                    </div>

                    <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                        <button
                            class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                            Can Exam AI correct exams automatically?
                            <svg class="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            <svg class="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-three"
                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                            <p class="text-gray-600">
                                Yes, Exam AI can automatically correct multiple-choice and true/false questions,
                                providing quick and accurate results.
                            </p>
                        </div>
                    </div>

                    <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                        <button
                            class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                            How secure is the data in Exam AI?
                            <svg class="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            <svg class="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-four"
                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                            <p class="text-gray-600">
                                Exam AI uses advanced security measures to ensure that all data is encrypted and
                                securely stored, protecting user privacy and confidentiality.
                            </p>
                        </div>
                    </div>

                    <div class="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                        <button
                            class="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500"
                            aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                            Can Exam AI be integrated with other platforms?
                            <svg class="hs-accordion-active:hidden block flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m6 9 6 6 6-6" />
                            </svg>
                            <svg class="hs-accordion-active:block hidden flex-shrink-0 size-5 text-gray-600 group-hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="m18 15-6-6-6 6" />
                            </svg>
                        </button>
                        <div id="hs-basic-with-title-and-arrow-stretched-collapse-five"
                            class="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
                            aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                            <p class="text-gray-600">
                                Yes, Exam AI offers APIs that allow integration with other educational platforms and
                                learning management systems for seamless operations.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- End Accordion -->
            </div>
            <!-- End Col -->
        </div>
        <!-- End Grid -->
    </div>
    <!-- End FAQ -->
</template>