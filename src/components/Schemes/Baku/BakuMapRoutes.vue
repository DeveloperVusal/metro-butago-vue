<script>
export default {
    props: [ 'include' ]
}
</script>

<template>
    <svg class="scheme-metro-view scheme-metro-view--onclick" viewBox="0 0 870 700" fill="none" xmlns="http://www.w3.org/2000/svg" v-html="include" v-show="include"></svg>
</template>