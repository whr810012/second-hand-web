<template>
  <div class="userMangae">
    <div style="margin-bottom: 15px;">
      <el-button type="primary" @click="addUser">添加用户</el-button>
      <el-button type="primary" @click="changeUserDialog">编辑用户</el-button>
      <el-button type="danger" @click="deleteUser">删除用户</el-button>
    </div>
    <div class="table">
      <el-table ref="multipleTableRef" :data="tableList" style="width: 100%" border
        @selection-change="handleSelectionChange">
        <el-table-column type="index"></el-table-column>
        <el-table-column type="selection" :selectable="selectable" width="55" />
        <el-table-column prop="uid" label="ID" align="center"></el-table-column>
        <el-table-column prop="name" label="昵称" align="center"></el-table-column>
        <el-table-column prop="username" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="age" label="年纪" align="center"></el-table-column>
        <el-table-column prop="xingbie" label="性别" align="center"></el-table-column>
        <el-table-column prop="telephone" label="电话" align="center"></el-table-column>
        <el-table-column label="角色" align="center">
          <template #default="scope">
            <span v-if="scope.row.isadmin === '1'">管理员</span>
            <span v-else>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="time" label="注册时间"></el-table-column>

      </el-table>
    </div>
    <el-dialog v-if="addUserShow" v-model="addUserShow" title="添加用户" width="45%">
      <el-form :model="form">
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off" />
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="updateUser">添加</el-button>
    </el-dialog>
    <el-dialog v-if="changeUserShow" v-model="changeUserShow" title="编辑用户" width="45%">
      <el-form :model="changeForm">
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="changeForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="changeForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="年纪" :label-width="formLabelWidth">
          <el-input v-model="changeForm.age" autocomplete="off" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="changeForm.xingbie" autocomplete="off" />
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="changeForm.telephone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="设置为管理员" :label-width="formLabelWidth">
          <el-checkbox v-model="changeForm.isadmin"></el-checkbox>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="changeUser">修改</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, Register, changeUser, deleteUser } from '@/api/request'
import dayjs from 'dayjs'
export default {
  name: 'userMangae',
  data() {
    return {
      tableList: [],
      checkVal: {},
      addUserShow: false,
      changeUserShow: false,
      form: {
        username: '',
        password: ''
      },
      changeForm: {

      }
    }
  },
  methods: {
    getUser() {
      getUser().then(res => {
        console.log(res.data.result)
        this.tableList = res.data.result
        this.tableList.forEach(item => {
          item.time = dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')
        })
      })
    },
    handleSelectionChange(val) {
      this.checkVal = val
    },
    addUser() {
      this.addUserShow = true
    },
    updateUser() {
      Register(this.form).then(() => {
        this.form = {
          username: '',
          password: ''
        }
        this.addUserShow = false
        this.$message.success('添加成功')
        this.getUser()
      })
    },
    changeUserDialog() {
      this.changeUserShow = true
      this.changeForm = this.checkVal[0]
      this.changeForm.isadmin = this.changeForm.isadmin === '1' ? true : false
    },
    changeUser() {
      this.changeForm.isadmin = this.changeForm.isadmin ? '1' : ''
      changeUser(this.changeForm).then(() => {
        this.changeUserShow = false
        this.$message.success('修改成功')
        this.getUser()
        this.changeForm = {}
      })
    },
    deleteUser() {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ uid: this.checkVal[0].uid }).then(() => {
          this.$message.success('删除成功')
          this.getUser()
        })
      })
    }
  },
  created() {
    this.getUser()
  }
}
</script>

<style lang="scss" scoped>
.userMangae {
  height: calc(100% - 20px);
  background: #fff;
  padding: 20px 20px 0 20px;
}
</style>