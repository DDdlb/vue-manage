<template>
    <h4>我的消息</h4>
    <div class="msg-content">
        <el-card class="message" v-for="message in messages" :key="message.id" shadow="hover">
            <el-row>
                <el-col :span="20">
                    {{message.message}}
                </el-col>
                <el-col :span="4">
                    <p class="msg-date">{{message.date}}</p>
                </el-col>
            </el-row>
            
        </el-card>
    </div>
    
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Message',
    setup() {
        const instance = getCurrentInstance().appContext.config.globalProperties
        // 消息列表
        const messages = ref([])

        onMounted(()=>{
            instance.$http.post('/user/msg',{studentNumber: instance.$store.state.userInfo.studentNumber}).then((res)=>{
                messages.value = res.messages
            })
        })

        return {
            messages
        }
    },
}
</script>

<style lang="scss">
.msg-content{
    width: 80%;
    margin: auto;
    .message{
        height: 50px;
        /* padding: 10px; */
        margin-bottom: 10px;
        cursor: pointer;

        p{
            height: 50px;
            line-height: 50px;
            margin: 0px;
        }
    }
}
</style>