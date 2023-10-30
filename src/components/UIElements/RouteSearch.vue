<script>
import './styles/RouteSearch.scss'

import { useRoutesStore } from '@/stores/routes'

export default {
    props: [
        'result',
        'action',
    ],
    setup() {
        const storeRoutes = useRoutesStore()

        return { storeRoutes }
    },
    methods: {
        fnSetRouteStation(id, action) {
            console.log('click', id, action)

            if (action === 'from') {
                this.storeRoutes.setRoute(this.storeRoutes.getRoute.from, id)
            } else if (action === 'to') {
                this.storeRoutes.setRoute(this.storeRoutes.getRoute.to, id)
            }
        }
    },
}
</script>

<template>
    <ul class="ui-route-search" v-show="result.length">
        <li
            v-for="station in result"
            :key="station.id"
            @click="fnSetRouteStation(station.id, action)"
        >
            <span :style="`background-color: ${station.color}`"></span>
            {{ station.name }}
        </li>
    </ul>
</template>