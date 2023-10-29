<script>
import './styles/MainView.scss'
import './styles/MapSVG.scss'

import SchemeMetroBakuLinesSVG from '@/components/Schemes/Baku/BakuMapLines.vue'
import SchemeMetroBakuStationsSVG from '@/components/Schemes/Baku/BakuMapStations.vue'
import SchemeMetroBakuRoutesSVG from '@/components/Schemes/Baku/BakuMapRoutes.vue'

import { useStationsStore } from '@/stores/stations'
import { useRoutesStore } from '@/stores/routes'
import Sidebar from '@/components/Sidebar/Sidebar.vue'
import DropDown from '@/components/UIElements/DropDown.vue'

export default {
    components: {
        Sidebar,
        SchemeMetroBakuLinesSVG,
        SchemeMetroBakuStationsSVG,
        SchemeMetroBakuRoutesSVG,
        DropDown
    },
    setup() {
        const store = useStationsStore()
        const store2 = useRoutesStore()

        return {
            store, store2
        }
    },
    mounted() {
        this.zoomInit()
        this.mapInit()
        this.dropdownHideView()
    },
    methods: {
        zoomInit() {
            this.zoomView = document.getElementById(this.zoomViewId)
            this.zoomStart = { 
                x: (this.zoomView.offsetLeft + this.zoomView.clientWidth) / 2, 
                y: (this.zoomView.offsetTop + this.zoomView.clientHeight) / 2
            }

            this.zoomSetTransform()

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

                let zoomRectLeft = (this.zoomPointX - (this.zoomView.offsetWidth / 2)) / 2
                let zoomRectRight = this.zoomView.offsetWidth / 2
                let zoomRectTop = (this.zoomPointY - (this.zoomView.offsetHeight / 2)) / 2
                let zoomRectBottom = this.zoomView.offsetHeight / 2

                if (
                    zoomRectTop <= -(this.zoomView.offsetHeight / 2) || 
                    this.zoomPointY >= zoomRectBottom ||
                    zoomRectLeft <= -(this.zoomView.offsetWidth / 2) || 
                    this.zoomPointX >= zoomRectRight
                ) {
                    // this.zoomPanning = false
                    return
                } else {
                    this.zoomSetTransform()
                }
            })

            this.zoomView.addEventListener('wheel', (e) => {
                e.preventDefault()

                let xs = (e.clientX - this.zoomPointX) / this.zoomScale
                let ys = (e.clientY - this.zoomPointY) / this.zoomScale
                let delta = e.wheelDelta ? e.wheelDelta : -e.deltaY
                

                if (delta > 0) {
                    if (this.zoomScale < this.zoomInMax) this.zoomScale *= 1.2
                } else {
                    if (this.zoomScale > this.zoomOutMax) this.zoomScale /= 1.2
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
                    stationsRender[item.name].onepoint = true
                    this.onePointStations[item.name].push(item.id)
                } else {
                    stationsRender[item.name] = {
                        id: item.id,
                        ids: [item.id],
                        name: item.name,
                        onepoint: false,
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
                    this.onePointStations[item.name] = [item.id]
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
                        color: this.store.colors[station[0].line_id],
                        opacity: false,
                    })
                }

                this.stationsSVG.push({
                    id: item.id,
                    name: item.name,
                    text_x: item.text.x,
                    text_y: item.text.y,
                    points,
                    opacity: false,
                    onepoint: item.onepoint,
                })
            }
        },

        dropdownHideView() {
            const elDropdownView = document.querySelector('.main__content')
            const elDropdown = document.querySelector('.dropdown')

            elDropdownView.addEventListener('click', (e) => {
                if (
                    !e.target.closest('.dropdown') && 
                    !e.target.closest('.scheme-metro-view__label') &&
                    this.isDropDown
                ) {
                    elDropdown.style.opacity = 0
                    elDropdown.style.top = '-5000px'

                    this.store.setIsActiveDropdown(false)
                }

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
        },

        convertToGraph(data) {
            let result = {}

            for (let i in data) {
                const item = data[i]

                /*if (item.hasOwnProperty('transfer')) {
                    for (let j in item.transfer) {
                        const transfetId = item.transfer[j]

                        item.move.splice(item.move.findIndex(itm => itm == transfetId), 1)
                    }

                    for (let j in item.transfer) {
                        const transfetId = item.transfer[j]

                        item.move.unshift(transfetId)
                    }
                }*/

                result[item.id] = item.graph
            }

            return result
        },
        dfsGraph(adj, v, t) {
            // adj - смежный список
            // v - посещенный узел (вершина)
            // t - пункт назначения

            // это общие случаи
            // либо достигли пункта назначения, либо уже посещали узел
            if (v === t) return true
            if (this.graph.visits.includes(v)) return false

            // помечаем узел как посещенный
            this.graph.visits.push(v)

            // исследуем всех соседей (ближайшие соседние вершины) v
            for (let neighbor of adj[v]) {
                // если сосед не посещался
                if (!this.graph.visits.includes(neighbor)) {
                    this.graph.path.push(neighbor)

                    // двигаемся по пути и проверяем, не достигли ли мы пункта назначения
                    let reached = this.dfsGraph(adj, neighbor, t)

                    // возвращаем true, если достигли
                    if (reached) return true
                }
            }
            
            this.graph.path = this.graph.path.filter((itm) => {
                return (itm !== v)
            })
            // если от v до t добраться невозможно
            return false
        },
        dijkstraGraph(graph, from, to) {
            const solutions = (function(graph, s) {
                let solutions = {};
                solutions[s] = [];
                solutions[s].dist = 0;
                
                while(true) {
                    let parent = null;
                    let nearest = null;
                    let dist = Infinity;
                
                    //for each existing solution
                    for(let n in solutions) {
                        if(!solutions[n]) continue
            
                        let ndist = solutions[n].dist;
                        let adj = graph[n];
            
                        //for each of its adjacent nodes...
                        for(let a in adj) {
                            //without a solution already...
                            if(solutions[a]) continue
            
                            //choose nearest node with lowest *total* cost
                            let d = adj[a] + ndist;
            
                            if(d < dist) {
                                //reference parent
                                parent = solutions[n]
                                nearest = a
                                dist = d
                            }
                        }
                    }
                    
                    //no more solutions
                    if(dist === Infinity) break
                    
                    //extend parent's solution path
                    solutions[nearest] = parent.concat(nearest)
                    //extend parent's cost
                    solutions[nearest].dist = dist
                }
                
                return solutions
            })(graph, from)
            const paths = []

            for(let s in solutions) {
                if(!solutions[s]) continue;

                const endPoint = solutions[s][solutions[s].length - 1]

                if (endPoint == to) {
                    paths.push({
                        solution: [...solutions[s].map(id => Number(id))],
                        dist: solutions[s].dist
                    })
                }
            }

            return paths
        },

        renderRoutes() {
            let movePathIndx = 1
            const renderPaths = {}

            this.graph.visits = []
            this.graph.path = []
            this.graph.points = this.convertToGraph(this.store.stations)

            const routes = this.dijkstraGraph(this.graph.points, this.store2.getRoute.from , this.store2.getRoute.to)

            this.graph.path = routes[0].solution
            this.store2.setPathTimeMin(routes[0].dist)

            this.graph.path.unshift(this.store2.getRoute.from)
            this.routesSVG = ''
            this.graph.path.forEach((itm, indx) => {
                // const prev = (indx > 0) ? (this.store.stations.filter(item => item.id === this.graph.path[indx - 1])[0]) : null
                const station = this.store.stations.filter(item => item.id === itm)[0];
                const next = (indx < this.graph.path.length) ? (this.store.stations.filter(item => item.id === this.graph.path[indx + 1])[0]) : null

                if ((indx + 1) < this.graph.path.length) {
                    if (
                        station.view.transfer !== undefined &&
                        station.transfer.includes(next.id)
                    ) {                        
                        for (let i in station.view.transfer) {
                            let itmTransfer = station.view.transfer[i]

                            this.routesSVG += `<use xlink:href="#tr-${station.view.render}-${itmTransfer}"></use>`
                            this.routesSVG += `<use xlink:href="#tr-${itmTransfer}-${station.view.render}"></use>`
                        }
                    }
                }

                if (next != null) {
                    for (let key in station.move) {
                        const move = station.move[key]

                        if (move === next.id) {
                            this.routesSVG += `<use xlink:href="#${station.view.render}-${next.view.render}"></use>`
                            this.routesSVG += `<use xlink:href="#${next.view.render}-${station.view.render}"></use>`
                        }
                    }
                }

                this.routesSVG += `<use xlink:href="#${station.view.render}"></use>`


                if (next != null) {
                    if (renderPaths.hasOwnProperty(movePathIndx)) {
                        renderPaths[movePathIndx].stations.push({
                            id: station.id,
                            name: station.name
                        })
                        renderPaths[movePathIndx].stationCount = renderPaths[movePathIndx].stations.length - 1
                        renderPaths[movePathIndx].times.move += (station.hasOwnProperty('transfer') ? 0 : station.graph[next.id]) ?? 0
                    } else {
                        renderPaths[movePathIndx] = {
                            stations: [{
                                id: station.id,
                                name: station.name
                            }],
                            line_id: station.line_id,
                            times: {
                                move: station.graph[next.id] ?? 0,
                                transfer: 0
                            },
                            stationCount: 1
                        }
                    }

                    if (station.hasOwnProperty('transfer')) {
                        if (station.transfer.includes(next.id)) {
                            renderPaths[movePathIndx].times.transfer = station.graph[next.id]

                            ++movePathIndx
                        }
                    }
                } else {
                    if (renderPaths.hasOwnProperty(movePathIndx)) {
                        renderPaths[movePathIndx].stations.push({
                            id: station.id,
                            name: station.name,
                        })
                        renderPaths[movePathIndx].stationCount = renderPaths[movePathIndx].stations.length - 1
                    } else {
                        renderPaths[movePathIndx] = {
                            stations: [{
                                id: station.id,
                                name: station.name
                            }],
                            line_id: station.line_id,
                            times: {
                                move: 0,
                                transfer: 0
                            },
                            stationCount: 1
                        }
                    }
                }

            })

            this.store2.setRoutePaths(renderPaths)

            this.stationsSVG = this.stationsSVG.map((itm) => {
                itm.opacity = true

                if (this.graph.path.includes(itm.id)) itm.opacity = false
                

                itm.points = itm.points.map((item) => {
                    if (!this.graph.path.includes(item.id)) item.opacity = true
                    
                    return item
                })

                return itm
            })

            this.stationsSVG = this.stationsSVG.map((itm) => {
                if (itm.opacity && this.onePointStations[itm.name].length > 1) {
                    for (let key in this.onePointStations[itm.name]) {
                        const item = this.onePointStations[itm.name][key]

                        if (this.graph.path.includes(item)) {
                            itm.opacity = false
                            break
                        }
                    }
                }

                return itm
            })
            

            this.isRenderRoute = true
        }
    },
    watch: {
        'store.getIsActiveDropdown': {
            handler(newVal) {
                this.isDropDown = newVal

                if (!newVal) this.dropdownHide()
            },
            deep: true
        },
        'store2.getRoute': {
            handler(route) {
                if (!route.from || !route.to) {
                    this.stationsSVG = this.stationsSVG.map((itm) => {
                        itm.opacity = false

                        itm.points = itm.points.map((item) => {
                            item.opacity = false
                            
                            return item
                        })

                        return itm
                    })

                    this.isRenderRoute = false
                    this.store2.setPathTimeMin(0)
                }
            },
            deep: true
        },
        'store2.getRoute.to': {
            handler(val) {
                if (val) this.renderRoutes()
                else this.isRenderRoute = false
            },
            deep: true
        }
    },
    data() {
        return {
            zoomViewId: 'zoom',
            zoomView: null,
            zoomPanning: false,
            zoomScale: 1.3,
            zoomPointX: 0,
            zoomPointY: 0,
            zoomStart: {x: 0, y: 0},
            zoomInMax: 2.2,
            zoomOutMax: 1.2,

            stationsSVG: [],
            routesSVG: '',
            onePointStations: {},

            isDropDown: false,
            isRenderRoute: false,
            graph: {
                points: {},
                visits: [],
                path: [],
            }
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
                    <SchemeMetroBakuLinesSVG :opacity="isRenderRoute" />
                    <SchemeMetroBakuRoutesSVG :include="routesSVG"/>
                    <SchemeMetroBakuStationsSVG :stations="stationsSVG" />
                </div>
                <DropDown />
            </div>
        </div>
    </main>
</template>
