<template>
    <!-- <div class="scroll">
        <div v-for=" item in 14" :key="item" class="time-item">
           <p class="p">{{item + 7}}:00 - {{item+8}}:00</p>
        </div>
    </div> -->
    <el-form
    ref="orderFormRef"
    :model="orderForm"
    :rules="rules"
    label-width="120px"
    class="orderForm"
  >
    <el-form-item label="选择座位" required>
        <el-row>
        <el-col :span="8">
            <el-form-item label="自习室">
                <el-select v-model="orderForm.room" placeholder="请选择自习室编号">
                    <el-option label="01室" value="1" />
                    <el-option label="02室" value="2" />
                    <el-option label="03室" value="3" />
                    <el-option label="04室" value="4" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="分区">
                <el-select v-model="orderForm.region" placeholder="请选择自习室编号">
                    <el-option label="01" value="1" />
                    <el-option label="02" value="2" />
                    <el-option label="03" value="3" />
                    <el-option label="04" value="4" />
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="8">
            <el-form-item label="座位">
                <el-select v-model="orderForm.sitNumber" placeholder="请选择座位室编号">
                    <el-option label="01" value="0" />
                    <el-option label="02" value="1" />
                    <el-option label="03" value="2" />
                    <el-option label="04" value="3" />
                </el-select>
            </el-form-item>
        </el-col>
        </el-row>
    </el-form-item>
    <!-- <el-form-item label="Activity zone" prop="region">
      <el-select v-model="ruleForm.region" placeholder="Activity zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="预约时间" required>
        <el-row>
      <el-col :span="11">
        <el-form-item prop="date1">
            <el-time-select
                v-model="orderForm.startTime"
                start="08:00"
                step="01:00"
                end="22:00"
                placeholder="Select time"
            />
        </el-form-item>
      </el-col>
      <el-col style="text-align: center" :span="1">
        <span>-</span>
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-select
            v-model="orderForm.endTime"
            start="08:00"
            step="01:00"
            end="22:00"
            placeholder="Select time"
            width='100%'
        />
        </el-form-item>
      </el-col>
      </el-row>
    </el-form-item>
    <el-form-item label="姓名" prop="name" required>
        <el-input v-model="orderForm.name" style="width: 50%" />
    </el-form-item>
    <el-form-item label="学号" prop="studentNumber" required>
        <el-input v-model="orderForm.studentNumber" style="width: 50%" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()"
        >预约</el-button
      >
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, toRaw } from '@vue/reactivity'
import { getCurrentInstance, onMounted } from '@vue/runtime-core'
import {
    ElMessage
} from 'element-plus'

export default{
    props:{
        sitLocation: Object
    },
    setup() {
        const instance = getCurrentInstance().appContext.config.globalProperties
        // 表单信息
        const orderForm = reactive({
        })
        // 表单提交
        const submitForm = ()=>{
            instance.appContext.config.globalProperties.$http.post('/sit/order',toRaw(orderForm)).then(()=>{
                ElMessage.success('预约成功')
            })
        }
        // 重置表单
        const resetForm = ()=>{
            getCurrentInstance().ctx.$ref["orderFormRef"].resetFields()
            // console.log(instance);
        }
        // 初始化
        onMounted(()=>{
            console.log(instance);
            const param = instance.$route.query
            console.log('param', param);
            if(param){
                orderForm.room = param.room
                orderForm.region = param.region
                orderForm.sitNumber = param.number
            }
            orderForm.name = instance.$store.state.userInfo.name
            orderForm.studentNumber = instance.$store.state.userInfo.studentNumber
            console.log("orderForm", orderForm);
        })
        return {
            orderForm,
            submitForm,
            resetForm
        }
    },
}
</script>


<style lang="scss">
.scroll{
    width: 100%;
    display: flex;
    justify-content: center;
    border-radius: 2px;
    margin-bottom: 30px;
    .time-item{
        width: 7%;
        height: 20px;
        background-color: rgb(90, 156, 248);
        text-align: center;
        color: #fff;
        cursor: pointer;
        /* border: 1px solid rgb(185, 185, 185); */
        .p{font-size: 1px;
            margin: 0px;
            height: 20px;
            line-height: 20px;
            
        }
    }
    .time-item:hover{
        background-color: rgb(71, 147, 255);
    }
    
}
.orderForm{
    width: 80%;
    margin: auto;
}
</style>