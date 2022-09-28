<script>
import './styles/Sidebar.scss'

import IconSwapSVG from '@/components/Icons/IconSwap.vue'

export default {
    components: {
        IconSwapSVG
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
                <select class="sidebar__city">
                    <option value="AZ:Baku">Baku</option>
                    <option value="TR:Istanbul">Istanbul</option>
                </select>
            </div>
        </div>

        <div class="sidebar__points">
            <div class="points sidebar__center">
                <div class="points__stations">
                    <div class="points__from_to">
                        <div class="points__dot_line"></div>
                        <div class="points__input">
                            <input type="text" placeholder="From">
                        </div>
                    </div>
                    <div class="points__from_to">
                        <div class="points__dot_line"></div>
                        <div class="points__input">
                            <input type="text" placeholder="To">
                        </div>
                    </div>
                </div>
                <div class="points__reverse">
                    <IconSwapSVG />
                </div>
            </div>
        </div>
    </div>
</template>