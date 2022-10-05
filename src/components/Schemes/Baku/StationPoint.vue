<script >
import { useRoutesStore } from '@/stores/routes'
import { useStationsStore } from '@/stores/stations'

export default {
    props: [
        'id',
        'name',
        'text_x',
        'text_y',
        'points',
        'opacity'
    ],
    setup() {
        const store = useRoutesStore()
        const store2 = useStationsStore()

        return {
            store, store2
        }
    },
    methods: {
        fnSelectedStation(event, stations) {
            if (stations >= 2) {
                const elDropdownView = document.body
                const elDropdown = document.querySelector('.dropdown')
                const mouseX = event.clientX, mouseY = event.clientY
                const newPoints = this.points.map(itm => {
                    return {
                        id: itm.id,
                        name: this.name,
                        color: itm.color
                    }
                })

                this.store2.setDropdown(newPoints)

                let createPosX = mouseX - (elDropdown.offsetWidth / 2)
                let createPosY = mouseY + 15

                if ((elDropdownView.clientHeight - mouseY) < 240) {
                    createPosY = mouseY - 80
                }

                if (mouseX < 380) {
                    createPosX = mouseX + 15
                }

                if (
                    (elDropdownView.clientWidth - mouseX) < 150 &&
                    (elDropdownView.clientHeight - mouseY) < 240
                ) {
                    createPosX = mouseX - (elDropdown.offsetWidth ?? 110)
                    createPosY = mouseY - 80
                } else {
                    if ((elDropdownView.clientWidth - mouseX) < 150) {
                        createPosX = mouseX - (elDropdown.offsetWidth ?? 110)
                    }

                    if ((elDropdownView.clientHeight - mouseY) < 240) {
                        createPosY = mouseY - 80
                    }
                }
                
                elDropdown.style.top = `${createPosY}px`
                elDropdown.style.left = `${createPosX}px`
                elDropdown.style.opacity = 1

                this.store2.setIsActiveDropdown(true)
            } else {
                if (this.store.getRoute.from) {
                    this.store.setRoute(this.store.getRoute.from, this.id)
                } else {
                    this.store.setRoute(this.id, null)
                }
            }
        }
    }
}
</script>

<template>
    <g 
        :class="`scheme-metro-view__label ${opacity ? 'scheme-metro-view__label--opacity' : ''}`" 
        @click="fnSelectedStation($event, points.length)"
    >
        <circle 
            v-for="point in points" 
            :cx="point.x" 
            :cy="point.y" 
            r="4" 
            :fill="point.color" 
            :key="point.id" 
            :opacity="point.opacity ? '0.3' : '1'"
        />

        <text :x="text_x" :y="text_y" font-weight="normal" font-size="10">
            <tspan :x="text_x" :y="text_y">{{ name }}</tspan>
        </text>
    </g>
</template>