<template>
    <div class="options-manage">
        <div style="margin-bottom: 20px">
            <el-button type="primary" @click="addOptions">添加</el-button>
            <el-button type="primary" @click="changeOptions">修改</el-button>
            <el-button type="danger">删除</el-button>
        </div>
        <el-table ref="multipleTableRef" :data="tableData" border style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="120" align="center"></el-table-column>
            <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
            <el-table-column property="lat" label="经度" align="center" />
            <el-table-column property="lng" label="维度" align="center" />
        </el-table>
        <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="添加轮廓图点位" width="500">
            <el-form :model="form">
                <el-form-item label="经度 (lat):" :label-width="formLabelWidth">
                    <el-input v-model="form.lat" autocomplete="off" />
                </el-form-item>
                <el-form-item label="纬度 (lng):" :label-width="formLabelWidth">
                    <el-input v-model="form.lng" autocomplete="off" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "optionsMnage",
    data() {
        return {
            dialogFormVisible: false,
            form:{
                lat:'',
                lng:''
            },
            tableData: [{
                id: 1, lat: 0, lng: 0
            }, {
                id: 2, lat: 0, lng: 0
            }, {
                id: 3, lat: 0, lng: 0
            }, {
                id: 4, lat: 0, lng: 0
            }, {
                id: 5, lat: 0, lng: 0
            }, {
                id: 6, lat: 0, lng: 0
            }],
            multipleSelection:[],
        }
    },
    methods:{
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        addOptions() {
            this.form = {
                lat:'',
                lng:''
            }
            this.dialogFormVisible = true
        },
        changeOptions(){
            if(this.multipleSelection.length == 1){
                this.form = this.multipleSelection[0]
                this.dialogFormVisible = true
            }else{
                this.$message.warning('请选择一个选项进行修改')
            }
        }
    },
    created() {
        this.$store.commit("setBreadList", [{ title: '地图管理' }, { title: '轮廓图管理' }]);
    },
}
</script>