<template>
  <div style="padding: 40px 20px 0 20px">
    <el-card style="width: 480px" shadow="hover">
      <el-image :src="require('../menu/menuLogo.png')"
        style="width: 100px;height:100px;margin-bottom: 20px;border-radius: 50%;border:4px solid #f1f1f1"></el-image>
      <el-form>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          {{ this.form.name }}
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          {{ this.form.xingbie }}
        </el-form-item>
        <el-form-item label="年纪" :label-width="formLabelWidth">
          {{ this.form.age }}
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          {{ this.form.telephone }}
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button @click="open" type="primary" style="width: 100px;">修改</el-button>
      </div>
    </el-card>
    <el-dialog v-model="show" v-if="show" title="修改信息" width="45%">
      <el-form :model="form" label-position="right">
        <el-form-item label="昵称:" label-width="70px">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别:" label-width="70px">
          <el-input v-model="form.xingbie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年纪:" label-width="70px">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" label-width="70px">
          <el-input v-model="form.telephone" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: right;">
        <el-button type="primary" @click="change">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMyInfo, changeUser } from '@/api/request'
export default {
  name: 'myInfo',
  data() {
    return {
      form: {},
      show: false
    }
  },
  methods: {
    open() {
      this.show = true
    },
    change() {
      changeUser(this.changeForm).then(() => {
        this.show = false
        this.$message.success('修改成功')
        this.getMyInfo({ uid: this.$store.state.MyInfo.uid }).then(res => {
          this.$store.commit('setUserInfo', res.data.data[0])
        })
      })
    }
  },
  created() {
    getMyInfo({ uid: this.$store.state.MyInfo.uid }).then(res => {
      this.form = res.data.data[0]
      console.log(this.form);
    })
  }
}
</script>

<style></style>