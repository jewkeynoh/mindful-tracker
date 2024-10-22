<script setup>
import { ref, computed } from 'vue';
import axios from 'axios';
import Card from '@/components/Card.vue';

// State to hold thoughts data
const thoughts = ref([]);
const dateFilter = ref('today'); // Default filter
const customDateRange = ref({ start: '', end: '' }); // For custom date range

// Function to fetch thoughts from the API
const fetchThoughts = async () => {
    try {
        const response = await axios.get('api/thoughts'); // Replace with your actual API endpoint
        thoughts.value = response.data;
    } catch (error) {
        console.error('Error fetching thoughts', error);
    }
};

// Fetch thoughts when the component mounts
fetchThoughts();

// Computed properties for analytics
const totalThoughts = computed(() => filteredThoughts.value.length);

const grandTotalThoughts = computed(() => thoughts.value.length);

const averageIntensity = computed(() => {
    if (filteredThoughts.value.length === 0) return 0; // Return 0 if no thoughts

    // Calculate the total intensity while ensuring values are valid numbers
    const totalIntensity = filteredThoughts.value.reduce((acc, thought) => {
        const intensity = Number(thought.intensityLevel); // Ensure it's a number
        return !isNaN(intensity) ? acc + intensity : acc; // Only add valid numbers
    }, 0);

    // Calculate and return the average, or return 0 if all intensities were invalid
    return (totalIntensity / filteredThoughts.value.length).toFixed(2);
});

const totalAverageIntensity = computed(() => {
    if (thoughts.value.length === 0) return 0; // Return 0 if no thoughts

    // Calculate the total intensity while ensuring values are valid numbers
    const totalIntensity = thoughts.value.reduce((acc, thought) => {
        const intensity = Number(thought.intensityLevel); // Ensure it's a number
        return !isNaN(intensity) ? acc + intensity : acc; // Only add valid numbers
    }, 0);

    // Calculate and return the average, or return 0 if all intensities were invalid
    return (totalIntensity / thoughts.value.length).toFixed(2);
});

// Filter thoughts based on selected date range
const filteredThoughts = computed(() => {
    const now = new Date();
    let filtered = thoughts.value;

    switch (dateFilter.value) {
        case 'today':
            const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            filtered = filtered.filter(thought => new Date(thought.created_at) >= startOfToday);
            break;
        case 'yesterday':
            const startOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            const endOfYesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            filtered = filtered.filter(thought => {
                const createdAt = new Date(thought.created_at);
                return createdAt >= startOfYesterday && createdAt < endOfYesterday;
            });
            break;
        case 'last7days':
            const startOfLast7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
            const endOfLast7Days = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            filtered = filtered.filter(thought => {
                const createdAt = new Date(thought.created_at);
                return createdAt >= startOfLast7Days && createdAt < endOfLast7Days;
            });
            break;
        case 'lastmonth':
            const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0); // Last day of the previous month
            filtered = filtered.filter(thought => {
                const createdAt = new Date(thought.created_at);
                return createdAt >= startOfLastMonth && createdAt <= endOfLastMonth;
            });
            break;
        case 'lastyear':
            const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1); // January 1st of last year
            const endOfLastYear = new Date(now.getFullYear() - 1, 11, 31, 23, 59, 59, 999); // December 31st of last year
            filtered = filtered.filter(thought => {
                const createdAt = new Date(thought.created_at);
                return createdAt >= startOfLastYear && createdAt <= endOfLastYear;
            });
            break;
        case 'custom':
            if (customDateRange.value.start && customDateRange.value.end) {
                const startDate = new Date(customDateRange.value.start);
                const endDate = new Date(customDateRange.value.end);
                endDate.setHours(23, 59, 59, 999); // Include the entire end date
                filtered = filtered.filter(thought => {
                    const createdAt = new Date(thought.created_at);
                    return createdAt >= startDate && createdAt <= endDate;
                });
            }
            break;
    }
    return filtered;
});

// Breakdown of thoughts by category
const thoughtsByCategory = computed(() => {
    return filteredThoughts.value.reduce((acc, thought) => {
        acc[thought.category] = (acc[thought.category] || 0) + 1;
        return acc;
    }, {});
});

// Intensity counts
const intensityCounts = computed(() => {
    return filteredThoughts.value.reduce((acc, thought) => {
        const intensity = thought.intensityLevel;
        acc[intensity] = (acc[intensity] || 0) + 1;
        return acc;
    }, {});
});

// Fetch recent thoughts (e.g., last 5)
const recentThoughts = computed(() => {
    return filteredThoughts.value.slice(-5); // Get the last 5 thoughts
});
</script>


<template>
    <Card customClass="w-screen max-w-2xl w-full">
        <h1 class="lg:text-4xl text-3xl font-bold mb-4 text-center text-blue-800">Analytics Overview</h1>
        <p class="text-center mb-8 text-gray-600">Gain insights into your thought patterns and manage your entries to enhance your self-awareness.</p>

        <div class="mb-8">
            <label for="date-filter" class="block font-semibold mb-2">Filter by Date</label>
            <select v-model="dateFilter" id="date-filter"
                class="w-full p-3 pl-4 border border-blue-200 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-800">
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 Days</option>
                <option value="lastmonth">Last Month</option>
                <option value="lastyear">Last Year</option>
                <option value="custom">Custom Range</option>
            </select>

            <div v-if="dateFilter === 'custom'" class="mt-4">
                <label for="start-date" class="block text-sm font-medium mb-1">Start Date</label>
                <input type="date" id="start-date" v-model="customDateRange.start"
                    class="w-full p-2 border border-blue-200 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-800 mb-2" />

                <label for="end-date" class="block text-sm font-medium mb-1">End Date</label>
                <input type="date" id="end-date" v-model="customDateRange.end"
                    class="w-full p-2 border border-blue-200 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-800" />
            </div>
        </div>

        <div class="mb-8">
            <h3 class="font-semibold pb-2">Overall Summary</h3>
            <ul class="list-none space-y-2">
                <li class="flex justify-between">
                    <span>Total Thoughts Logged</span>
                    <span class="font-medium">{{ grandTotalThoughts }}</span>
                </li>
                <li class="flex justify-between">
                    <span>Average Intensity Level</span>
                    <span class="font-medium">{{ totalAverageIntensity }}</span>
                </li>
            </ul>
        </div>

        <div class="mb-8">
            <h3 class="font-semibold pb-2">Total Entries</h3>
            <h1 class="text-5xl font-bold text-blue-800">{{ totalThoughts }}</h1>
        </div>

        <div class="mb-8">
            <h3 class="font-bold">Current Average Intensity</h3>
            <div class="text-xs pb-2 text-gray-400">
                This value reflects the intensity ratings you assigned when logging your thoughts.
            </div>
            <h1 class="text-blue-800 text-5xl font-bold">{{ averageIntensity }}</h1>
        </div>

        <div class="mb-8">
            <h3 class="font-semibold pb-2">Intensity Breakdown</h3>
            <ul class="list-none space-y-2" v-if="Object.keys(intensityCounts).length">
                <li v-for="(count, intensity) in intensityCounts" :key="intensity" class="flex justify-between space-y-2">
                    <div>
                        <span class="me-1">Intensity Level:</span>
                        <span>{{ intensity }}</span>
                    </div>
                    <div>
                        <span class="me-1">Occurrences:</span>
                        <span>{{ count }}</span>
                    </div>
                </li>
            </ul>
            <div v-else class="text-gray-400 text-sm">No data available yet. Start logging your thoughts to see the breakdown!</div>
        </div>

        <div class="mb-8">
            <h3 class="font-semibold pb-2">Thought Categories Breakdown</h3>
            <ul class="list-none space-y-2" v-if="Object.keys(thoughtsByCategory).length">
                <li v-for="(count, category) in thoughtsByCategory" :key="category" class="flex justify-between space-y-2">
                    <span>{{ category }}:</span>
                    <span class="font-medium">{{ count }}</span>
                </li>
            </ul>
            <div v-else class="text-gray-400 text-sm">You haven't logged any categories yet. Begin tracking your thoughts to visualize the distribution!</div>
        </div>

        <div class="mb-8">
            <h3 class="font-semibold pb-2">Recent Entries</h3>
            <ul class="list-none space-y-2" v-if="recentThoughts.length">
                <li v-for="thought in recentThoughts" :key="thought.id" class="border-b py-2">
                    <div class="mb-2">
                        <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">{{
                            thought.category }}</span>
                    </div>
                    <span class="font-medium">{{ thought.thought }}</span>
                </li>
            </ul>
            <div v-else class="text-gray-400 text-sm">No recent entries found. Log your thoughts to keep track of your journey!</div>
        </div>

        <div class="text-center pt-6">
            <div class="bg-green-100 p-6 rounded-lg text-sm outline-dashed outline-1 outline-green-500">
                Keep adding your thoughts to gain deeper insights and track your progress over time.
            </div>
        </div>
    </Card>
</template>

<style scoped>
/* Add any additional styles specific to this component here */
</style>
