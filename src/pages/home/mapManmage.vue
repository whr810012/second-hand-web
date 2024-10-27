<template>
    <div class="map">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="点位管理" name="first"></el-tab-pane>
            <el-tab-pane label="轮廓图管理" name="second"></el-tab-pane>
            <el-tab-pane label="预览" name="third"></el-tab-pane>
        </el-tabs>
        <div v-if="activeName == 'first'">
            <MarksManage></MarksManage>
        </div>
        <div v-if="activeName == 'second'">
            <OptionsManage />
        </div>
        <div v-if="activeName == 'third'" >
            <Mapview/>
        </div>
    </div>
</template>

<script>
import Mapview from "../../components/mapmanage/MapContainer.vue";
import OptionsManage from "../../components/mapmanage/OptionsManage.vue";
import MarksManage from "../../components/mapmanage/MarksManage.vue"
export default {
    name: 'homeIndex',
    components: {
        Mapview,
        OptionsManage,
        MarksManage
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.map {
    padding: 20px;
}
</style>