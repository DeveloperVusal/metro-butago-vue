<script >
import { useRoutesStore } from '@/stores/routes'

export default {
    props: [
        'id',
        'name',
        'text_x',
        'text_y',
        'ponts'
    ],
    setup() {
        const store = useRoutesStore()

        return {
            store
        }
    },
    methods: {
        fnSelectedStation() {
            // console.log(this.id, this.store.getRoute)
            if (this.store.getRoute.from) {
                this.store.setRoute(this.store.getRoute.from, this.id)
            } else {
                this.store.setRoute(this.id, null)
            }
        }
    }
}
</script>

<template>
    <g class="scheme-metro-view__label" @click="fnSelectedStation()">
        <circle v-for="point in ponts" :cx="point.x" :cy="point.y" r="4" :fill="point.color" :key="point.id" />

        <text :x="text_x" :y="text_y" font-weight="normal" font-size="10">
            <tspan :x="text_x" :y="text_y">{{ name }}</tspan>
        </text>
    </g>
</template>