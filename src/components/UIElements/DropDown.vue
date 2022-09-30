<script>
import './styles/DropDown.scss'

import { useStationsStore } from '@/stores/stations'
import { useRoutesStore } from '@/stores/routes'

export default {
    setup() {
        const store = useStationsStore()
        const store2 = useRoutesStore()

        return {
            store, store2
        }
    },
    watch: {
        'store.getDropdown': {
            handler(newVal) {
                this.list = newVal
            },
            deep: true
        } 
    },
    
    methods: {
        fnSelectedStation(id) {
            if (this.store2.getRoute.from) {
                this.store2.setRoute(this.store2.getRoute.from, id)
            } else {
                this.store2.setRoute(id, null)
            }

            this.store.setIsActiveDropdown(false)
        }
    },
    data() {
        return {
            list: []
        }
    }
}
</script>

<template>
    <div class="dropdown">
        <div class="dropdown__box">
            <ul class="dropdown-stations">
                <li 
                    v-for="item in list" 
                    :key="item.id" 
                    @click="fnSelectedStation(item.id)"
                    class="stations__station"
                >
                    <span class="stations__station-color" :style="'background-color:' + item.color + ';'"></span>
                    <span class="stations__station-name">{{ item.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>