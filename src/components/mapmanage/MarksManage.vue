<template>
  <div class="options-manage">
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="addOptions">添加</el-button>
      <el-button type="primary" @click="changeOptions">修改</el-button>
      <el-button type="danger" @click="deleteMarkers">删除</el-button>
    </div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="index"
        label="序号"
        width="120"
        align="center"
      ></el-table-column>
      <el-table-column
        type="selection"
        :selectable="selectable"
        width="55"
        align="center"
      />
      <el-table-column property="lng" label="经度" align="center" />
      <el-table-column property="lat" label="纬度" align="center" />
      <el-table-column property="name" label="名称" align="center" />
      <el-table-column property="icon" label="类型" align="center" />
      <el-table-column property="detail" label="详情" align="center">
        <template #default="scope">
          <div
            style="
              width: 100px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            "
          >
            {{ scope.row.detail }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-if="dialogFormVisible"
      v-model="dialogFormVisible"
      title="添加位置信息"
      width="500"
      @close="form = {}"
    >
      <el-form :model="form">
        <el-form-item label="经度 (lng):" :label-width="formLabelWidth">
          <el-input v-model="form.lat" autocomplete="off" />
        </el-form-item>
        <el-form-item label="纬度 (lat):" :label-width="formLabelWidth">
          <el-input v-model="form.lng" autocomplete="off" />
        </el-form-item>
        <el-form-item label="名称:" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.icon">
            <el-option v-for="item in classList" :key="item.value" :label="item.value" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详情:" :label-width="formLabelWidth">
          <el-input v-model="form.detail" autocomplete="off" type="textarea" />
        </el-form-item>
        <el-form-item label="图片:" :label-width="formLabelWidth">
          <el-upload
            action="#"
            v-model:file-list="form.image"
            :auto-upload="false"
            limit="3"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="handleChange"
            accept="image/jpg,image/jpeg,image/png"
          >
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
          <el-button type="primary" @click="uploadFrom"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  getMarkers,
  subMarkers,
  deleteMarkers,
  updateMarkers,
} from "../../api/request.js";
export default {
  name: "marksManage",
  data() {
    return {
      classList: [
        {value : '教学楼'},
        {value : '餐厅'},
        {value : '宿舍'},
        {value : '操场'},
        {value : '图书馆'},
        {value : '电影院'},
        {value: '校医院'},
        {value: '博物馆'}
      ],
      imageshow: false,
      dialogFormVisible: false,
      form: {
        id: "",
        lat: "",
        lng: "",
        name: "",
        icon: "",
        detail: "",
        image: "",
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    addOptions() {
      this.form = {
        lat: "",
        lng: "",
        name: "",
        icon: "",
        detail: "",
        image: "",
      };
      this.dialogFormVisible = true;
    },
    changeOptions() {
      if (this.multipleSelection.length == 1) {
        this.form = this.multipleSelection[0];
        this.dialogFormVisible = true;
      } else {
        this.$message.warning("请选择一个选项进行修改");
      }
    },
    handlePictureCardPreview(file) {
      this.imageshow = true;
      this.dialogImageUrl = file.url;
    },
    handleRemove(file) {
      console.log(file);
    },
    handleExceed() {
      this.$message.warning("最多上传3张图片");
    },
    handleChange(file, fileList) {
      console.log(file, fileList);
    },
    uploadFrom() {
      console.log(this.form);
      const isChange = !!this.form.markerid;
      if (
        this.form.lat &&
        this.form.lng &&
        this.form.name &&
        this.form.icon &&
        this.form.detail &&
        this.form.image
      ) {
        if (isChange) {
          console.log(this.form);
          this.form.filesJson = [];
          this.form.oldfilesJson = [];
          this.form.oldfilesJson = JSON.stringify(
            this.form.image.filter((item) => !item.raw)
          );
          let formData = new FormData();
          let obj = { ...this.form };
          Object.keys(obj).forEach((key) => {
            formData.append(key, obj[key]);
          });
          if (Array.isArray(this.form.image)) {
            for (let i = 0; i < this.form.image.length; i++) {
              const file = this.form.image[i].raw; // 假设 raw 是一个有效的 File 对象
              if (file) {
                formData.append(`files`, file); // 使用数组形式或不同的字段名
              }
            }
          }
          console.log(formData);
          updateMarkers(formData)
            .then(() => {
              this.initMarkers();
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
            })
            .catch(() => {
              this.$message.error("文件过大，修改失败");
              this.dialogFormVisible = false;
              this.initMarkers();
            });
        } else {
          let formData = new FormData();
          let obj = { ...this.form };
          Object.keys(obj).forEach((key) => {
            formData.append(key, obj[key]);
          });
          // 确保 this.form.image 是一个数组并且存在
          if (Array.isArray(this.form.image)) {
            for (let i = 0; i < this.form.image.length; i++) {
              const file = this.form.image[i].raw; // 假设 raw 是一个有效的 File 对象
              if (file) {
                formData.append(`files`, file); // 使用数组形式或不同的字段名
              }
            }
          }
          console.log(`数据：${formData.get("file")}`);
          subMarkers(formData)
            .then(() => {
              this.initMarkers();
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
            })
            .catch(() => {
              this.$message.error("文件过大，修改失败");
              this.dialogFormVisible = false;
              this.initMarkers();
            });
        }
      } else {
        this.$message.warning("请填写完整信息");
      }
    },
    initMarkers() {
      getMarkers().then((res) => {
        this.tableData = res.data.data;
        // console.log("filesJson:", this.tableData); // 调试输出
        this.tableData.forEach((item) => {
          item.image = JSON.parse(item.filesJson);
          item.image.forEach((img) => {
            const mimeType = img.contentType; // 根据实际情况选择 MIME 类型
            img.url = `data:${mimeType};base64,${img.base64}`;
          });
        });
        console.log(this.tableData);
      });
    },
    deleteMarkers() {
      if (this.multipleSelection.length >= 1) {
        this.$confirm("此操作将永久删除该选项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            deleteMarkers({
              ids: this.multipleSelection.map((item) => item.markerid),
            }).then(() => {
              this.$message.success("删除成功");
              this.initMarkers();
            });
          })
          .catch(() => {
            this.$message.info("已取消删除");
          });
      } else {
        this.$message.warning("请选择一个选项进行删除");
      }
    },
  },
  created() {
    this.$store.commit("setBreadList", [
      { title: "地图管理" },
      { title: "点位管理" },
    ]);
    this.initMarkers();
  },
};
</script>