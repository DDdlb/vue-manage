<template>
  <div class="user-manage">
    <div class="query-form">
      <el-form
        ref="formRef"
        :inline="true"
        :model="userForm"
        class="demo-form-inline"
      >
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="userForm.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userForm.userName" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="用户状态" prop="state">
          <el-select v-model="userForm.state" placeholder="Activity zone">
            <el-option label="所有" :value="0" />
            <el-option label="在职" :value="1" />
            <el-option label="所有" :value="2" />
            <el-option label="所有" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">新增</el-button>
        <el-button type="danger" @click="handlePatchDelete">批量删除</el-button>
      </div>
      <el-table
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        class="pagination"
        :page-size="pager.pageSize"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog v-model="showDialog">
      <el-form
        ref="userDialogRef"
        :model="userDialog"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="userDialog.userName" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="邮箱" prop="userEmail">
          <el-input v-model="userDialog.userEmail" placeholder="请输入用户邮箱">
            <template #append>@imooc.com</template>
          </el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input
            v-model="userDialog.mobile"
            placeholder="请输入用户手机号"
          />
        </el-form-item>
        <el-form-item label="岗位" prop="job">
          <el-input v-model="userDialog.job" placeholder="请输入用户名成" />
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="userDialog.state" placeholder="请输入用户名成" style="width:100%">
            <el-option label="在职" :value="1"></el-option>
            <el-option label="离职" :value="2"></el-option>
            <el-option label="试用期" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="系统角色" prop="roleLost">
          <el-select v-model="userDialog.roleLost" placeholder="请选择用户角色" multiple style="width:100%">
            <el-option 
                v-for="dept in roleList"
                :key="dept._id"
                :label="dept.roleName" 
                :value="dept._id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门" prop="deptId">
          <el-cascader
            v-model="userDialog.deptId"
            placeholder="请选择所属部门" 
            :options="deptList"
            :props="{ checkStrictly: true, value: '_id', label: 'deptName' }"
            clearable
            style="width:100%"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance, toRaw } from "vue";
import { ElMessage } from 'element-plus'
export default {
  name: "User",
  setup() {
    // 获取vue对象
    const instance = getCurrentInstance();
    console.log(instance);
    const globCtx = instance.appContext.config.globalProperties;
    // 用户表单
    const userForm = reactive({
      state: 0,
    });
    // 新增用户dialog数据
    const userDialog = reactive({});
    // userDialog规则
    const rules = reactive({
      userName: [
        {
          required: true,
          message: "请输入姓名",
          trigger: "blur",
        },
      ],
      userEmail: [
        {
          required: true,
          message: "请输入邮箱",
          trigger: "blur",
        },
      ],
      deptId: [
        {
          required: true,
          message: "请输入邮箱",
          trigger: "blur",
        },
      ],
      mobile: [
        {
          required: true,
          message: "请输入手机号",
          trigger: "blur",
        },
        {
          pattern: /1\d{10}/, // 1开头，十一位
          message: "请输入正确手机号格式",
          trigger: "blur",
        },
      ],
    });
    // 用户列表
    const userList = ref([]);
    // 显示弹窗
    const showDialog = ref(false);
    // 选中用户对象
    const checkUserIds = ref([]);
    // 所有角色列表
    const roleList = ref([]);
    // 所有部门
    const deptList = ref([]);
    // 提交操作，add表示添加用户，edit表示更新用户
    const action = ref('add');
    // 表格格式
    const columns = reactive([
      {
        label: "用户ID",
        prop: "userId",
      },
      {
        label: "用户名",
        prop: "userName",
      },
      {
        label: "用户邮箱",
        prop: "userEmail",
      },
      {
        label: "用户角色",
        prop: "role",
        formatter(row, column, val) {
          return {
            0: "管理员",
            1: "普通用户",
          }[val];
        },
      },
      {
        label: "用户状态",
        prop: "state",
        formatter(row, column, val) {
          return {
            1: "在职",
            2: "离职",
            3: "试用期",
          }[val];
        },
      },
      {
        label: "注册时间",
        prop: "createTime",
      },
      {
        label: "最后登录时间",
        prop: "lastLoginTime",
      },
    ]);
    // 分页对象
    const pager = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    // 获取用户列表接口
    const getUserList = async () => {
      // console.log(ctx);
      let params = { ...userForm, ...pager };
      try {
        const { list, page } =
          await instance.appContext.config.globalProperties.$request.get(
            "/users/list",
            params,
            {mock: false}
          );
        userList.value = list;
        pager.total = page.total;
      } catch (error) {
        console.error(error);
      }
    };
    // 查询事件处理
    const handleQuery = () => {
      getUserList();
    };
    // 重置事件处理
    const handleReset = () => {
      instance.ctx.$refs["formRef"].resetFields();
    };
    // 分页事件处理
    const handleCurrentChange = (currentPage) => {
      pager.pageNum = currentPage;
    };
    // 选中事件
    const handleSelectionChange = (list) => {
      let arr = [];
      list.map((item) => {
        arr.push(item.userId);
      });
      checkUserIds.value = arr;
    };

    // 删除事件处理
    const handleDelete = async (row) => {
      console.log(row);
      const res = await globCtx.$request.post("/users/delete", {
        userIds: [row.userId],
      });
      if (res.nModified > 0) {
        globCtx.$message.success("删除成功");
        getUserList();
      } else {
        globCtx.$message.error("删除失败");
      }
    };

    // 批量删除事件
    const handlePatchDelete = async () => {
      if (checkUserIds.value.length == 0) {
        globCtx.$message.error("请选择要删除用户");
        return;
      }
      const res = await globCtx.$request.post("/users/delete", {
        userIds: checkUserIds.value,
      });
      if (res.nModified > 0) {
        globCtx.$message.success("删除成功");
        getUserList();
      } else {
        globCtx.$message.error("删除失败");
      }
    };
    // 获取所有角色列表接口
    const getRoleList = async () => {
      let list = await globCtx.$request.get("/roles/allList");
      roleList.value = list;
      console.log("RoleList=>",list);
    };
    // 获取所有部门列表
    const getDepthList = async () => {
      let list = await globCtx.$request.get("/dept/list");
      deptList.value = list;
      console.log("deptList=>",list);
    };
    // 新增用户
    const handleCreate = () => {
      showDialog.value = true;
    };
    // 关闭dialog弹窗
    const handleClose = () =>{
      showDialog.value = false
      instance.ctx.$refs["userDialogRef"].resetFields();
    }
    // 编辑功能
    const handleEdit = (row)=>{
      // console.log(action);
      // console.log(row);
      showDialog.value = true
      action.value = 'edit'
      // console.log(instance);
      instance.ctx.$nextTick(()=>{
        Object.assign(userDialog, row) 
      })
      
    }
    // 提交新增表单
    const handleSubmit = () =>{
      instance.ctx.$refs.userDialogRef.validate(async (valid)=>{
        if(valid){
          let param = toRaw(userDialog)
          param.action = action.value
          const res = await globCtx.$request.post('/users/operate', param)
          if(res){
            showDialog.value = false
            ElMessage.success("新增成功")
            instance.ctx.$refs["userDialogRef"].resetFields();
            getUserList()
          }
        }
      })
    }
    onMounted(() => {
      getUserList();
      getRoleList();
      getDepthList();
    });
    return {
      userForm,
      userList,
      columns,
      getUserList,
      pager,
      handleQuery,
      handleReset,
      handleCurrentChange,
      handleDelete,
      handlePatchDelete,
      handleSelectionChange,
      handleCreate,
      showDialog,
      userDialog,
      rules,
      getRoleList,
      getDepthList,
      roleList,
      deptList,
      handleEdit,
      handleClose,
      handleSubmit
    };
  },
};
</script>


<style lang="scss">
</style>