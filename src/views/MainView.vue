<script>
import './styles/MainView.scss'
import './styles/MapSVG.scss'

import Sidebar from '@/components/Sidebar/Sidebar.vue'
import SchemeMetroBakuLinesSVG from '@/components/Schemes/Baku/BakuMapLines.vue'
import SchemeMetroBakuStationsSVG from '@/components/Schemes/Baku/BakuMapStations.vue'

export default {
    components: {
        Sidebar, 
        SchemeMetroBakuLinesSVG,
        SchemeMetroBakuStationsSVG
    },
    mounted() {
        this.zoomInit()
    },
    methods: {
        zoomInit() {
            this.zoomView = document.getElementById(this.zoomViewId)

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
            zoomStart: {x: 0, y: 0}
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
                    <SchemeMetroBakuStationsSVG />
                </div>
            </div>
        </div>
    </main>
</template>
