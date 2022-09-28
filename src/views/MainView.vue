<script>
import './styles/MainView.scss'

import Sidebar from '@/components/Sidebar/Sidebar.vue'
import SchemeMetroBakuSVG from '@/components/Schemes/BakuMap.vue'

export default {
    components: {
        Sidebar, SchemeMetroBakuSVG
    }
}
</script>

<template>
    <main class="main">
        <div class="main__flex">
            <Sidebar />
            <div class="main__content">
                <div class="main__svg">
                    <SchemeMetroBakuSVG />
                </div>
            </div>
        </div>
    </main>
</template>
