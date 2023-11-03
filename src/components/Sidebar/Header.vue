<script>
import './styles/Header.scss'

export default {
    data() {
        return {
            main_url: import.meta.env.VITE_MAIN_DOMAIN
        }
    }
}
</script>

<template>
    <div class="header">
        <div class="sidebar__center sidebar__center--fixed">
            <a :href="main_url">
                <div class="logo">
                    <img src="@/assets/images/logo-text.svg" alt="">
                </div>
            </a>
            <div class="location">
                <div class="location__flag">
                    <img src="@/assets/images/flags/az.png" alt="">
                </div>
                <div class="location__city">Baki</div>
            </div>
        </div>
    </div>
</template>