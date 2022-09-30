<script>
import StationPoint from '@/components/Schemes/Baku/StationPoint.vue'

export default {
    props: [ 'include' ],
    components: {
        StationPoint
    },
}
</script>

<template>
    <svg class="scheme-metro-view scheme-metro-view--onclick" viewBox="0 0 870 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <StationPoint 
            v-for="item in include" 
            :id="item.id"
            :name="item.name"
            :text_x="item.text_x"
            :text_y="item.text_y"
            :points="item.points"
            :key="item.id"
        />
    </svg>
</template>