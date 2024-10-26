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
            <el-table-column property="name" label="名称" align="center" />
            <el-table-column property="icon" label="类型" align="center" />
            <el-table-column property="detail" label="详情" align="center" />
        </el-table>
        <el-dialog v-if="dialogFormVisible" v-model="dialogFormVisible" title="添加位置信息" width="500">
            <el-form :model="form">
                <el-form-item label="经度 (lat):" :label-width="formLabelWidth">
                    <el-input v-model="form.lat" autocomplete="off" />
                </el-form-item>
                <el-form-item label="纬度 (lng):" :label-width="formLabelWidth">
                    <el-input v-model="form.lng" autocomplete="off" />
                </el-form-item>
                <el-form-item label="名称:" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="类型:" :label-width="formLabelWidth">
                    <el-input v-model="form.icon" autocomplete="off" />
                </el-form-item>
                <el-form-item label="详情:" :label-width="formLabelWidth">
                    <el-input v-model="form.detail" autocomplete="off" type="textarea" />
                </el-form-item>
                <el-form-item label="图片:" :label-width="formLabelWidth">
                    <el-upload v-model:file-list="form.image" :auto-upload="false" limit="4" list-type="picture-card"
                        :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="handleExceed">
                        <el-icon>
                            <Plus />
                        </el-icon>
                    </el-upload>
                    <el-dialog v-model="imageshow">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取消</el-button>
                    <el-button type="primary" @click="uploadFrom">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "marksManage",
    data() {
        return {
            imageshow: false,
            dialogFormVisible: false,
            form: {
                lat: '',
                lng: '',
                name: '',
                icon: '',
                detail: '',
                image: ''
            },
            tableData: [{
                id: 1,
                lat: 0,
                lng: 0,
                name: '教学楼',
                icon: 'school',
                detail: '好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习好好学习',
                image: [{
                    name: 'food.jpeg',
                    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                }]
            }],
            multipleSelection: [],
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        addOptions() {
            this.form = {
                lat: '',
                lng: '',
                name: '',
                icon: '',
                detail: '',
                image: ''
            }
            this.dialogFormVisible = true
        },
        changeOptions() {
            if (this.multipleSelection.length == 1) {
                this.form = this.multipleSelection[0]
                this.dialogFormVisible = true
            } else {
                this.$message.warning('请选择一个选项进行修改')
            }
        },
        handlePictureCardPreview(file) {
            this.imageshow = true
            this.dialogImageUrl = file.url
        },
        handleRemove(file) {
            console.log(file);
        },
        handleExceed() {
            this.$message.warning('最多上传4张图片')
        },
        uploadFrom() {
            console.log(this.form);
            const isChange = !!this.form.id
            if (this.form.lat && this.form.lng && this.form.name && this.form.icon && this.form.detail && this.form.image) {
                if (isChange) {
                    this.$message.success('修改成功')
                    this.dialogFormVisible = false
                } else {
                    this.$message.success('添加成功')
                    this.dialogFormVisible = false
                }
            } else {
                this.$message.warning('请填写完整信息')
            }
        }
    },
    created() {
        this.$store.commit("setBreadList", [{ title: '地图管理' }, { title: '点位管理' }]);
    },
}
</script>