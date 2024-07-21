<script>
import './styles/Sidebar.scss'

import IconSwapSVG from '@/components/Icons/IconSwap.vue'
import IconCloseSVG from '@/components/Icons/IconClose.vue'
import IconWalkerSVG from '@/components/Icons/IconWalker.vue'

import { useRoutesStore } from '@/stores/routes'
import { useStationsStore } from '@/stores/stations'
import { useUIStore } from '@/stores/ui'

import CustomScrollbar from '@/components/Feature/Scrollbar/CustomScrollbar.vue'
import IncHeader from '@/components/Sidebar/Header.vue'
import RouteSearch from '@/components/UIElements/RouteSearch.vue'

export default {
    components: {
        IconSwapSVG,
        IconCloseSVG,
        IconWalkerSVG,
        CustomScrollbar,
        IncHeader,
        RouteSearch
    },
    setup() {
        const storeRoutes = useRoutesStore()
        const storeStations = useStationsStore()
        const storeUI = useUIStore()

        return {
            storeRoutes,
            storeStations,
            storeUI
        }
    },
    mounted() {
        this.routeLoad(this.storeRoutes.getRoute)

        this.toggleSidebar = this.storeUI.getToggleSidebar
    },
    watch: {
        'storeRoutes.getRoute': {
            handler(route) {
                this.routeLoad(route)
            },
            deep: true
        },
        'storeRoutes.getPathTimeMin': {
            handler(time) {
                this.routes.time = time
            },
            deep: true
        },
        'storeRoutes.getRoutePaths': {
            handler(paths) {
                console.log('render')
                this.routes.paths = paths
                this.routes.transfers = Object.keys(paths).length - 1
            },
            deep: true
        },
        'storeUI.getToggleSidebar': {
            handler(newVal) {
                this.toggleSidebar = newVal
            },
            deep: true
        },
    },
    methods: {
        routeLoad(route) {
            const from = this.storeStations.stations.filter((stat) => {
                return route.from === stat.id
            })
            const to = this.storeStations.stations.filter((stat) => {
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
                    color: this.storeStations.colors[from[0].line_id]
                }
            }

            if (to.length) {
                this.route_to = {
                    name: to[0].name,
                    color:  this.storeStations.colors[to[0].line_id]
                }
            }
        },
        fnResetRoute() {
            this.storeRoutes.setRoute(null, null)
        },
        fnToggleSidebar(e) {
            const elBtn = e.target.closest('.hide-btn')

            if (elBtn.classList.contains('hide-btn')) {
                if (!elBtn.classList.contains('hide-btn--ishide')) {
                    this.storeUI.setToggleSidebar(false)
                } else this.storeUI.setToggleSidebar(true)
            } else {
                console.error(['Not found'])
            }
        },
        fnSearchStations(el, n) {
            const val = el.target.value.toLowerCase()
            
            if (n === 1) {
                this.route_from.name = val
                this.srch_results_from = []
            } else if (n === 2) {
                this.route_to.name = val
                this.srch_results_to = []
            }

            if (val.length) {
                this.storeStations.stations.map(item => {
                    if (item.name.toLowerCase().indexOf(val.trim()) != -1) {
                        const setObj = {
                            id: item.id,
                            name: item.name,
                            color: this.storeStations.colors[item.line_id],
                        }

                        if (n === 1) {
                            const isTo = this.srch_results_to.filter((elem) => {
                                return elem.id == item.id;
                            })

                            if (!isTo.length) this.srch_results_from.push(setObj)
                        }
                        else if (n === 2) {
                            const isFrom = this.srch_results_from.filter((elem) => {
                                return elem.id == item.id;
                            })
                            if (!isFrom.length) this.srch_results_to.push(setObj)
                        }
                    }
                })

                if (n === 1) this.srch_results_from.sort(this.sort_stations)
                else if (n === 2) this.srch_results_to.sort(this.sort_stations)
            }
        },
        sort_stations(a, b) {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        },
    },
    data() {
        return {
            toggleSidebar: null,
            srch_results_from: [],
            srch_results_to: [],
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
    <div :class="`sidebar${(this.toggleSidebar == false)?' sidebar--hide':''}`">
        <div :class="`hide-btn${(this.toggleSidebar == false)?' hide-btn--ishide':''}`" @click="fnToggleSidebar($event)">
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
                                    <input type="text" placeholder="Hardan" :value="route_from.name" @input="fnSearchStations($event, 1)">
                                    <IconCloseSVG :from="null" v-show="storeRoutes.getRoute.from" :to="storeRoutes.getRoute.to" />

                                    <RouteSearch :result="srch_results_from" :action="'from'"></RouteSearch>
                                </div>
                            </div>
                            <div class="points__from_to">
                                <div 
                                    class="points__dot_line" 
                                    :style="(route_to.color) ? 'background-color: ' + route_to.color : ''"
                                ></div>
                                <div class="points__input">
                                    <input type="text" placeholder="Haraya" :value="route_to.name" @input="fnSearchStations($event, 2)">
                                    <IconCloseSVG :to="null" v-show="storeRoutes.getRoute.to" :from="storeRoutes.getRoute.from" />

                                    <RouteSearch :result="srch_results_to" :action="'to'"></RouteSearch>
                                </div>
                            </div>
                        </div>
                        <div 
                            :class="(route_from.name || route_to.name) ? 'points__reverse points__reverse--active' : 'points__reverse'"
                            @click="storeRoutes.setReverseRoute()"
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