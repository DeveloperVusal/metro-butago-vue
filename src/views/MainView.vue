<script>
import './styles/MainView.scss'
import './styles/MapSVG.scss'

import SchemeMetroBakuLinesSVG from '@/components/Schemes/Baku/BakuMapLines.vue'
import SchemeMetroBakuStationsSVG from '@/components/Schemes/Baku/BakuMapStations.vue'

import { useStationsStore } from '@/stores/stations'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import DropDown from '@/components/UIElements/DropDown.vue'

export default {
    components: {
        Sidebar,
        SchemeMetroBakuLinesSVG,
        SchemeMetroBakuStationsSVG,
        DropDown
    },
    setup() {
        const store = useStationsStore()

        return {
            store
        }
    },
    mounted() {
        this.zoomInit()
        this.mapInit()
        this.dropdownHide()
    },
    methods: {
        zoomInit() {
            this.zoomView = document.getElementById(this.zoomViewId)
            // this.zoomStart = { 
            //     x: (this.zoomView.offsetLeft + this.zoomView.clientWidth) / 2, 
            //     y: (this.zoomView.offsetTop + this.zoomView.clientHeight) / 2
            // }

            this.zoomView.addEventListener('mousedown', (e) => {
                e.preventDefault()

                this.zoomStart = { x: e.clientX - this.zoomPointX, y: e.clientY - this.zoomPointY }
                this.zoomPanning = true
            })

            this.zoomView.addEventListener('mouseup', () => {
                this.zoomPanning = false
            })

            this.zoomView.addEventListener('mousemove', (e) => {
                e.preventDefault()

                if (!this.zoomPanning) return

                this.zoomPointX = (e.clientX - this.zoomStart.x)
                this.zoomPointY = (e.clientY - this.zoomStart.y)

                this.zoomSetTransform()
            })

            this.zoomView.addEventListener('wheel', (e) => {
                e.preventDefault()

                let xs = (e.clientX - this.zoomPointX) / this.zoomScale
                let ys = (e.clientY - this.zoomPointY) / this.zoomScale
                let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
                
                if (delta > 0) {
                    if (this.zoomScale < 3) this.zoomScale *= 1.2
                } else {
                    if (this.zoomScale > 0.8) this.zoomScale /= 1.2
                }

                this.zoomPointX = e.clientX - xs * this.zoomScale
                this.zoomPointY = e.clientY - ys * this.zoomScale

                this.zoomSetTransform()
            })
        },
        zoomSetTransform() {
            this.zoomView.style.transform = `translate(${this.zoomPointX}px, ${this.zoomPointY}px) scale(${this.zoomScale})`
        },

        mapInit() {
            // const store = useStationsStore()
            const stationsRender = {}

            this.store.stations.map((item) => {
                if (item.name in stationsRender) {
                    stationsRender[item.name].points.push({
                        id: item.id,
                        x: item.view.point.x,
                        y: item.view.point.y,
                    })
                    stationsRender[item.name].ids.push(item.id)
                } else {
                    stationsRender[item.name] = {
                        id: item.id,
                        ids: [item.id],
                        name: item.name,
                        text: {
                            x: item.view.text.x,
                            y: item.view.text.y,
                        },
                        points: [{
                            id: item.id,
                            x: item.view.point.x,
                            y: item.view.point.y,
                        }]
                    }
                }
            })

            for (let key in stationsRender) {
                const item = stationsRender[key]
                const points = []

                for (let k in item.points) {
                    const point = item.points[k]
                    const station = this.store.stations.filter(itm => {
                        return point.id === itm.id
                    })

                    points.push({
                        id: point.id,
                        x: point.x,
                        y: point.y,
                        color: this.store.colors[station[0].line_id]
                    })
                }

                this.includeSVG.push({
                    id: item.id,
                    name: item.name,
                    text_x: item.text.x,
                    text_y: item.text.y,
                    points
                })
            }
        },

        dropdownHideView() {
            const elDropdownView = document.querySelector('.main__content')
            const elDropdown = document.querySelector('.dropdown')

            elDropdownView.addEventListener('click', (e) => {
                if (
                    !e.target.closest('.dropdown') && 
                    this.isDropDown
                ) {
                    elDropdown.style.opacity = 0
                    elDropdown.style.top = '-5000px'

                    this.store.setIsActiveDropdown(false)
                }

                console.log(e.target.closest('.dropdown'), this.isDropDown)

                if (e.target.closest('.dropdown') && !this.isDropDown) {
                    elDropdown.style.opacity = 0
                    elDropdown.style.top = '-5000px'
                }
            })
        },
        dropdownHide() {
            const elDropdown = document.querySelector('.dropdown')

            elDropdown.style.opacity = 0
            elDropdown.style.top = '-5000px'
        }
    },
    watch: {
        'store.getIsActiveDropdown': {
            handler(newVal) {
                this.isDropDown = newVal

                if (!newVal) this.dropdownHide()
            },
            deep: true
        }
    },
    data() {
        return {
            zoomViewId: 'zoom',
            zoomView: null,
            zoomPanning: false,
            zoomScale: 1,
            zoomPointX: 0,
            zoomPointY: 0,
            zoomStart: {x: 0, y: 0},

            includeSVG: [],

            isDropDown: false
        }
    }
}
</script>

<template>
    <main class="main">
        <div class="main__flex">
            <Sidebar />
            <div class="main__content">
                <div class="main__svg" id="zoom">
                    <SchemeMetroBakuLinesSVG />
                    <SchemeMetroBakuStationsSVG :include="includeSVG"/>
                </div>
                <DropDown />
            </div>
        </div>
    </main>
</template>
