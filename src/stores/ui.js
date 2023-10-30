import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', () => {
    const toggleSidebar = ref(true)
    
    const getToggleSidebar = computed(() => {
        // return parseBool(localStorage.getItem('toggleSidebar')) ?? toggleSidebar.value
        return toggleSidebar.value
    })

    const parseBool = (val) => {
        if (val.toLowerCase().trim() === 'true') return true
        else if (val.toLowerCase().trim() === 'false') return false
        else return val
    }

    const setToggleSidebar = (val) => {
        toggleSidebar.value = val
        // localStorage.setItem('toggleSidebar', val)
    }

    return {
        toggleSidebar, getToggleSidebar, setToggleSidebar,
    }
})