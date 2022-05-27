<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <router-link v-if="index == 0" to="/welcome" >{{item.meta.title}}</router-link>
        <span v-else>{{item.meta.title}}</span> 
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default{
    name: 'BreadCrumb',
    computed:{
        breadList(){
            return this.$route.matched;
        }
    },
}
</script>
