<template>
  <div style="padding: 40px 20px 0 20px">
    <el-card style="width: 480px" shadow="hover">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/upLoadImage"
        :data="formData"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        style="background-color: aliceblue;width:100px;height:100px;display: flex;justify-content: center;align-items: center;"
      >
        <img v-if="url" style="width: 100px;height:100px;font-size: 60px;" :src="url" class="avatar" />
        <el-icon v-else style="width: 60px;height:60px;font-size: 60px;" class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
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
      show: false,
      url:""
    }
  },
  computed:{
    formData(){
      return{
        uid: this.$store.state.MyInfo.uid
      }
    }
  },
  methods: {
    open() {
      this.show = true
    },
    change() {
      const data = {
        uid: this.$store.state.MyInfo.uid,
        name: this.form.name,
        xingbie: this.form.xingbie,
        age: this.form.age,
        telephone: this.form.telephone,
        username: this.$store.state.MyInfo.username,
        password: this.$store.state.MyInfo.password,
        isadmin:this.$store.state.MyInfo.isadmin
      }
      changeUser(data).then(() => {
        this.show = false
        this.$message.success('修改成功')
        getMyInfo({ uid: this.$store.state.MyInfo.uid }).then(res => {
          const data = res.data.data[0]
          if (data.img){
            data.img = JSON.parse(data.img)
          }
          this.$store.commit('setUserInfo', data)
          localStorage.setItem('userInfo', JSON.stringify(data))
          const mimeType = data.img.contentType
          this.url = `data:${mimeType};base64,${data.img.base64}`;
        })
      })
    },
    handleAvatarSuccess(res){
      console.log(res);
      getMyInfo({ uid: this.$store.state.MyInfo.uid }).then(res => {
          const data = res.data.data[0]
          if (data.img){
            data.img = JSON.parse(data.img)
          }
          this.$store.commit('setUserInfo', data)
          localStorage.setItem('userInfo', JSON.stringify(data))
          const mimeType = data.img.contentType
          this.url = `data:${mimeType};base64,${data.img.base64}`;
        })
    }
  },
  created() {
    getMyInfo({ uid: this.$store.state.MyInfo.uid }).then(res => {
      this.form = res.data.data[0]
      if (this.form.img) {
        // 将json转换成对象
        this.form.img = JSON.parse(this.form.img)
        const mimeType = this.form.img.contentType
        this.url = `data:${mimeType};base64,${this.form.img.base64}`;
      }
      console.log(this.form);
    })
  }
}
</script>

<style></style>