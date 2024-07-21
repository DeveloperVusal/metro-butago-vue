<script>
import { ref, watch } from 'vue'
import './styles/RouteSearch.scss'

import { useRoutesStore } from '@/stores/routes'

export default {
    props: [
        'result',
        'action',
    ],
    setup(props) {
        const storeRoutes = useRoutesStore()
        const localResult = ref([...props.result])
        const syncLocalResult = () => {
            localResult.value = [...props.result]
        }

        watch(() => props.result, syncLocalResult)

        const fnSetRouteStation = (id, action) => {
            if (action === 'from') {
                storeRoutes.setRoute(id, storeRoutes.getRoute.to)
            } else if (action === 'to') {
                storeRoutes.setRoute(storeRoutes.getRoute.from, id)
            }

            localResult.value = []
        }

        return {
            localResult,
            fnSetRouteStation
        }
    },
}
</script>

<template>
    <ul class="ui-route-search" :style="`display: ${localResult.length ? 'block' : 'none'}`">
        <li
            v-for="station in localResult"
            :key="station.id"
            @click="fnSetRouteStation(station.id, action)"
        >
            <span :style="`background-color: ${station.color}`"></span>
            {{ station.name }}
        </li>
    </ul>
</template>