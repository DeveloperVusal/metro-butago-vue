<script>
import './styles/RouteSearch.scss'

import { useRoutesStore } from '@/stores/routes'

export default {
    props: [
        'result',
        'action',
    ],
    setup() {
        const store = useRoutesStore()

        return { store }
    },
    methods: {
        fnSetRouteStation(id, action) {
            console.log('click', id, action)

            if (action === 'from') {
                this.store.setRoute(this.store.getRoute.from, id)
            } else if (action === 'to') {
                this.store.setRoute(this.store.getRoute.to, id)
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