<template>
  <div class="base-content">
    <div :class="['nav-left', isCollapse ? 'fold' : 'unfold']">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
        <span>Manager</span>
      </div>
      <TreeMenu :userMenu="userMenu"/>
    </div>
    <div :class="['content-right', isCollapse ? 'fold' : 'unfold']">
      <div class="fix-nav-top">
        <div class="bread">
          <!-- <i class=""></i> -->
          
          <el-icon
            @click="toggle"
            :class="['collapseIcon', isCollapse ? 'fold' : '']"
          >
            <fold />
          </el-icon>
          <!-- <p>面包屑</p> -->
            <BreadCrumb class="bread-crumb"/>
        </div>
        <div class="user">
          <el-badge class="item" type="danger" :is-dot="noticeCount">
            <el-icon><bell /></el-icon>
          </el-badge>
          <el-dropdown @command="handleLogout" class="user-drop">
            <span class="user-link">
              {{ userInfo.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="email"
                  >邮箱: {{ userInfo.email }}</el-dropdown-item
                >
                <el-dropdown-item command="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="wrap-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TreeMenu from '../components/TreeMenu.vue'
import BreadCrumb from '../components/BreadCrumb.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "home",
  components: {
      TreeMenu,
      BreadCrumb
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
      isCollapse: false,
      noticeCount: 0,
      userMenu: [],
    };
  },
  mounted() {
    // this.getNoticeCount();
    this.getMenuList();
  },
  methods: {
    handleLogout(key) {
      if (key == "email") return;
      this.$store.commit("saveUserInfo", "");
      this.userInfo = null;
      this.$router.push("/login");
    },
    toggle() {
      this.isCollapse = !this.isCollapse;
    },
    // 消息通知
    // async getNoticeCount() {
    //   try {
    //     const count = await this.$http.get("/leave/count", {});
    //     this.noticeCount = count;
    //     // console.log("count=>",count);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // 菜单列表
    async getMenuList() {
      try {
        const list = await this.$http.get('/menu/list', {});
        console.log(list);
        this.userMenu = list;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>


<style lang="scss">
.base-content {
  position: relative;
  .nav-left {
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    color: #fff;
    overflow-y: auto;
    transition: width 0.5s;
    .logo {
      display: flex;
      align-items: center;
      font-size: 18px;
      height: 50px;
      img {
        width: 40px;
        height: 40px;
        margin: 0 10px;
      }
    }
    &.fold {
      width: 60px;
    }
    &.unfold {
      width: 200px;
    }
  }
  .content-right {
    margin-left: 200px;
    transition: margin 0.5s;
    .fix-nav-top {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      color: #000;
      font-size: 18px;
      .bread {
        .collapseIcon {
          width: 20px;
          color: #000;
          cursor: pointer;
          transition: transform 0.5s;
          margin-right: 20px;
        }
        .bread-crumb{
            display: inline-block;
            margin-right: 20px;
        }
        fold {
          animation: rotate 0.5s;
          -webkit-animation: rotate 0.5s;
        }
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
            -ms-transform: rotate(0deg); /* IE 9 */
            -moz-transform: rotate(0deg); /* Firefox */
            -o-transform: rotate(0deg);
          }
          100% {
            transform: rotate(180deg);
            -ms-transform: rotate(360deg); /* IE 9 */
            -moz-transform: rotate(360deg); /* Firefox */
            -o-transform: rotate(360deg);
          }
        }
      }
      .user {
        .item {
          line-height: 30px;
          margin-top: 10px;
          cursor: pointer;
          margin-right: 20px;
        }

        .user-drop {
          height: 50px;
          line-height: 50px;
          margin-top: 0px;
          cursor: pointer;
          color: #409eff;
        }
      }
    }
    .wrap-content {
      background: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
    }
    &.fold {
      margin-left: 60px;
    }
    &.unfold {
      margin-left: 200px;
    }
  }
}
</style>