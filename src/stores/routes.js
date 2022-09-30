import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoutesStore = defineStore('routes', () => {
    const route = ref({
        from: null, 
        to: null
    })

    const getRoute = computed(() => route.value)

    const setRoute = (from, to) => {
        route.value.from = from
        route.value.to = to
    }

    const setReverseRoute = () => {
        setRoute(getRoute.value.to, getRoute.value.from)
    }

    return { route, getRoute, setRoute, setReverseRoute }
})