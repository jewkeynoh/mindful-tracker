<template>
    <div class="min-h-screen flex flex-col">
        <div class="w-full mx-auto max-w-2xl flex-grow flex flex-col justify-center">
            <!-- Mobile View -->
            <div
                class="fixed top-0 left-0 w-full bg-white h-16 border-b border-gray-300 z-10 md:hidden flex justify-between p-5">
                <!-- Mobile header content here -->
            </div>

            <!-- Desktop View -->
            <div
                class="hidden md:flex fixed left-0 top-0 w-18 h-full space-y-2 pl-2 pr-2 flex flex-col justify-between">
                <!-- Desktop sidebar content here -->
            </div>

            <!-- Mobile View Bottom Navigation -->
            <div class="fixed bottom-0 z-10 left-0 w-full bg-white h-16 md:hidden">
                <!-- Mobile footer content here -->
            </div>

            <main class="flex-grow">
                <div class="flex flex-col justify-center lg:px-6 mx-auto">
                    <div class="flex flex-col items-center justify-center lg:px-6 mx-auto h-screen">
                        <!-- Login page here -->
                    </div>
                </div>
            </main>
        </div>
        <footer class="text-xs text-gray-400 p-4 flex justify-center border-t border-gray-300">
            <!-- Footer details here -->
        </footer>
    </div>

</template>