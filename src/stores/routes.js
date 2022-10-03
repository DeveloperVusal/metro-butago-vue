import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', () => {
    const route = ref({
        from: null, 
        to: null
    })
    const pathTimeMin = ref(0)

    const getRoute = computed(() => route.value)
    const getPathTimeMin = computed(() => pathTimeMin.value)

    const setPathTimeMin = (min) => {
        pathTimeMin.value = min
    }

    const setRoute = (from, to) => {
        route.value.from = from
        route.value.to = to
    }

    const setReverseRoute = () => {
        setRoute(getRoute.value.to, getRoute.value.from)
    }

    return {
        getRoute, setRoute,
        setReverseRoute,
        getPathTimeMin, setPathTimeMin,
    }
})