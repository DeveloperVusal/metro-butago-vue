<script>
import StationPoint from '@/components/Schemes/Baku/StationPoint.vue'

export default {
    props: [ 'stations' ],
    components: {
        StationPoint
    },
}
</script>

<template>
    <svg class="scheme-metro-view scheme-metro-view--onclick" viewBox="0 0 965 700" fill="none" xmlns="http://www.w3.org/2000/svg">
        <StationPoint 
            v-for="item in stations" 
            :id="item.id"
            :name="item.name"
            :text_x="item.text_x"
            :text_y="item.text_y"
            :points="item.points"
            :opacity="item.opacity"
            :key="item.id"
        />

        <g id="transfer-lineы">
            <rect width="8.25161" height="2.87986" rx="1" transform="matrix(0.705891 -0.708321 0.741011 0.671493 373.081 427.325)" fill="white"/>
            <path d="M183.846 282.646C183.471 283.051 182.853 283.061 182.466 282.668L178.08 278.213C177.692 277.819 177.682 277.171 178.057 276.765L178.654 276.119C179.028 275.713 179.646 275.703 180.034 276.097L184.42 280.552C184.807 280.946 184.817 281.594 184.443 281.999L183.846 282.646Z" fill="white"/>
        </g>
    </svg>
</template>