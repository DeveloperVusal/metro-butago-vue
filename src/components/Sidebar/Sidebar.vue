<script>
import './styles/Sidebar.scss'

import IconSwapSVG from '@/components/Icons/IconSwap.vue'
import IconCloseSVG from '@/components/Icons/IconClose.vue'

import { useRoutesStore } from '@/stores/routes'
import { useStationsStore } from '@/stores/stations'

export default {
    components: {
        IconSwapSVG,
        IconCloseSVG
    },
    setup() {
        const store = useRoutesStore()
        const store2 = useStationsStore()

        return {
            store,
            store2
        }
    },
    mounted() {
        this.routeLoad(this.store.getRoute)
    },
    watch: {
        'store.getRoute': {
            handler(route) {
                this.routeLoad(route)
            },
            deep: true
        },
        'store.getPathTimeMin': {
            handler(time) {
                this.route_time = time
            },
            deep: true
        }
    },
    methods: {
        routeLoad(route) {
            const from = this.store2.stations.filter((stat) => {
                return route.from === stat.id
            })
            const to = this.store2.stations.filter((stat) => {
                return route.to === stat.id
            })
        
            this.route_from = {
                name: '',
                color: ''
            }
            this.route_to = {
                name: '',
                color: ''
            }


            if (from.length) {
                this.route_from = {
                    name: from[0].name,
                    color: this.store2.colors[from[0].line_id]
                }
            }

            if (to.length) {
                this.route_to = {
                    name: to[0].name,
                    color:  this.store2.colors[to[0].line_id]
                }
            }
        },
    },
    data() {
        return {
            route_time: 0,
            route_from: {
                name: '',
                color: ''
            },
            route_to: {
                name: '',
                color: ''
            }
        }
    }
}
</script>

<template>
    <div class="sidebar">
        <div class="sidebar__top">
            <div class="sidebar__center sidebar__center--fixed">
                <div class="logo">
                    <img src="@/assets/images/logo-text.svg" alt="">
                </div>
            </div>
        </div>

        <div class="sidebar__points">
            <div class="points sidebar__center">
                <div class="points__stations">
                    <div class="points__from_to">
                        <div 
                            class="points__dot_line" 
                            :style="(route_from.color) ? 'background-color: ' + route_from.color : ''"
                        ></div>
                        <div class="points__input">
                            <input type="text" placeholder="Hardan" :value="route_from.name">
                            <IconCloseSVG :from="null" :to="store.getRoute.to" />
                        </div>
                    </div>
                    <div class="points__from_to">
                        <div 
                            class="points__dot_line" 
                            :style="(route_to.color) ? 'background-color: ' + route_to.color : ''"
                        ></div>
                        <div class="points__input">
                            <input type="text" placeholder="Haraya" :value="route_to.name">
                            <IconCloseSVG :to="null" :from="store.getRoute.from" />
                        </div>
                    </div>
                </div>
                <div 
                    :class="(route_from.name || route_to.name) ? 'points__reverse points__reverse--active' : 'points__reverse'"
                    @click="store.setReverseRoute()"
                >
                    <IconSwapSVG />
                </div>
            </div>
        </div>

        <div class="sidebar__times" v-if="route_time > 0">
            <div class="times sidebar__center">
                <div class="times__h1">Çatma müddəti</div>
                <div class="times__time">
                    <span>{{ route_time }}</span> dəqiqə
                </div>
            </div>
        </div>
    </div>
</template>