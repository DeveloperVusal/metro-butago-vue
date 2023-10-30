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
        const storeRoutes = useRoutesStore()
        const storeStations = useStationsStore()

        return {
            storeRoutes, storeStations
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

                this.storeStations.setDropdown(newPoints)

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

                this.storeStations.setIsActiveDropdown(true)
            } else {
                if (this.storeRoutes.getRoute.from) {
                    this.storeRoutes.setRoute(this.storeRoutes.getRoute.from, this.id)
                } else {
                    this.storeRoutes.setRoute(this.id, null)
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
            r="3.4"
            fill="white"
            :stroke="point.color"
            :key="point.id" 
            :opacity="point.opacity ? '0.3' : '1'"
        />
        <text
            fill="black"
            xml:space="preserve"
            style="white-space: pre" 
            font-family="Inter"
            font-size="9"
            font-weight="500" 
            letter-spacing="0em"
        >
            <tspan :x="text_x" :y="text_y">{{ name }}</tspan>
        </text>
    </g>
</template>