<script>
import './styles/Sidebar.scss'

import IconSwapSVG from '@/components/Icons/IconSwap.vue'
import IconCloseSVG from '@/components/Icons/IconClose.vue'
import IconWalkerSVG from '@/components/Icons/IconWalker.vue'

import { useRoutesStore } from '@/stores/routes'
import { useStationsStore } from '@/stores/stations'

import CustomScrollbar from '@/components/Feature/Scrollbar/CustomScrollbar.vue'
import IncHeader from '@/components/Sidebar/Header.vue'

export default {
    components: {
        IconSwapSVG,
        IconCloseSVG,
        IconWalkerSVG,

        CustomScrollbar,
        IncHeader,
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
                this.routes.time = time
            },
            deep: true
        },
        'store.getRoutePaths': {
            handler(paths) {
                this.routes.paths = paths

                this.routes.transfers = Object.keys(paths).length - 1
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
        fnResetRoute() {
            this.store.setRoute(null, null)
        },
        toggleSidebar(e) {
            const elBtn = e.target.closest('.hide-btn')

            if (elBtn.classList.contains('hide-btn')) {
                const elSidebar = this.$el
                const elMainContent = this.$el.parentElement.querySelector('.main__content')

                if (!elBtn.classList.contains('hide-btn--ishide')) {
                    elBtn.classList.add('hide-btn--ishide')
                    elSidebar.classList.add('sidebar--hide')
                    elMainContent.classList.add('main__content--isfull')
                } else {
                    elBtn.classList.remove('hide-btn--ishide')
                    elSidebar.classList.remove('sidebar--hide')
                    elMainContent.classList.remove('main__content--isfull')
                }
            } else {
                console.error(['Not found'])
            }
        }
    },
    data() {
        return {
            routes: {
                time: 0,
                transfers: 0,
                paths: []
            },
            route_from: {
                name: '',
                color: ''
            },
            route_to: {
                name: '',
                color: ''
            },
            settings: {
                suppressScrollY: false,
                suppressScrollX: false,
                wheelPropagation: false,
                wheelSpeed: 0.3,
            }
        }
    }
}
</script>

<template>
    <div class="sidebar">
        <div class="hide-btn" @click="toggleSidebar($event)">
            <div class="hide-btn__icon"></div>
        </div>
        <IncHeader />
        <CustomScrollbar>
            <div class="sidebar__box">
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
                                    <IconCloseSVG :from="null" v-show="store.getRoute.from" :to="store.getRoute.to" />
                                </div>
                            </div>
                            <div class="points__from_to">
                                <div 
                                    class="points__dot_line" 
                                    :style="(route_to.color) ? 'background-color: ' + route_to.color : ''"
                                ></div>
                                <div class="points__input">
                                    <input type="text" placeholder="Haraya" :value="route_to.name">
                                    <IconCloseSVG :to="null" v-show="store.getRoute.to" :from="store.getRoute.from" />
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

                <div class="sidebar__route-reset sidebar__center" v-if="routes.time > 0">
                    <button
                        class="route-reset__button" 
                        type="button"
                        @click="fnResetRoute()"
                    >Marşrutu sıfırlayın</button>
                </div>

                <div class="sidebar__routes" v-if="routes.time > 0">
                    <div class="routes sidebar__center">
                        <ul class="routes__list">
                            <li class="routes__route">
                                <div class="routes__times">
                                    <span class="routes-times__time">{{ routes.time }} dəqiqə</span>
                                    <span v-if="(routes.transfers)">
                                        —
                                        <span class="routes-times__transfer">
                                            {{ routes.transfers }} keçid
                                        </span>
                                    </span>
                                </div>
                                <div class="routes__path">
                                    <div class="route-path">
                                        <div
                                            v-for="path,key in routes.paths"
                                            :key="key"
                                        >
                                            <ul 
                                                :class="`
                                                    route-path__move route-path__move--color-line_${path.line_id}
                                                `"
                                            >
                                                <div class="route-path__time">
                                                    <div>{{ path.stationCount }} stan</div>
                                                    <div>{{ path.times.move }} dəq</div>
                                                </div>

                                                <li 
                                                    v-for="station,indx in path.stations"
                                                    :class="`
                                                        station ${(indx == 0) ? 'station--first-last' : ''} ${((indx + 1) == path.stations.length && path.stations.length > 1) ? 'station--first-last' : ''}
                                                    `"
                                                    :key="station.id"
                                                >
                                                    <span class="station__line"></span>
                                                    <div class="station__text">{{ station.name }}</div>
                                                </li>
                                            </ul>
                                            <div
                                                v-if="(key != Object.keys(routes.paths).slice(-1).pop())"
                                                class="routes-transfer"
                                            >
                                                <div class="routes-transfer__icon">
                                                    <IconWalkerSVG />
                                                </div>
                                                <div class="routes-transfer__text">Keçid — {{ path.times.transfer }} dəqiqə</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </CustomScrollbar>
    </div>
</template>