<script>
import './styles/CustomScrollbar.scss'

export default {
    mounted() {
        this.setHeight()
    },
    methods: {
        setHeight() {
            const elScrollBox = document.querySelector(`.${this.el.className}`)
            const windowHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

            elScrollBox.style.height = `${windowHeight - elScrollBox.offsetTop}px`
        }
    },
    data() {
        return {
            el: {
                className: 'butago-vue-custom-scrollbar'
            }
        }
    }
}
</script>
<template>
    <div :class="el.className">
        <slot></slot>
    </div> 
</template>