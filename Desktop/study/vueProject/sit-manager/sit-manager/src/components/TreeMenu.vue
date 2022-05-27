<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#001529"
    router
    text-color="#fff"
    :collapse="isCollapse"
  >
    <template v-for="menu in userMenu">
      <el-sub-menu
        v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1"
        :key="menu._id"
        :index="menu.path"
      >
        <template #title>
            <el-icon>
                
            </el-icon>
          <span>{{ menu.menuName }}</span>
        </template>
        <tree-menu :userMenu="menu.children" />
      </el-sub-menu>
      <el-menu-item 
            v-else-if="menu.menuType==1"
            :key="menu._id" 
            :index="menu.path"
        >
       {{menu.menuName}}
        </el-menu-item>
    </template>

    <!-- <el-sub-menu index="2">
      <template #title>
        <span>审批管理</span>
      </template>
      <el-menu-item index="2-1">
        <el-icon><icon-menu /></el-icon>
        <span>休假申请</span>
      </el-menu-item>
      <el-menu-item index="2-2">
        <el-icon><icon-menu /></el-icon>
        <span>待我审批</span>
      </el-menu-item>
    </el-sub-menu> -->
  </el-menu>
</template>

<script>
export default {
  name: "TreeMenu",
  props: {
    userMenu: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
      return {
          activeMenu: ''
      }
  }
};
</script>
