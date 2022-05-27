<template>
    <h4 style="text-align: center">0{{query.room}}室 {{query.region}}分区座位分布</h4>
    <div class="sit-content">
        
        <div  v-for="sit in sits" :key="sit.id" :class="sit.available == 1?'sit-block blue':(sit.available == -1?'sit-block red':'sit-block gray')" @click="handleClick(sit)">
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'

export default{
    name: 'SitDetail',
    setup() {
        const instance = getCurrentInstance().appContext.config.globalProperties
        // 座位信息
        const sits = ref([])
        // query param
        const query = ref({})
        // 点击座位
        const handleClick = (sit)=>{
            instance.$router.push(`/sit/order?room=${query.value.room}&region=${query.value.region}&number=${sit.sitNumber}`)
        }
        onMounted(()=>{
            const param = instance.$route.query
            query.value = param
            instance.$http.get('/sit/detail',param).then((res)=>{
                console.log(res)
                sits.value = res.sits
            })
        })
        return {
            query,
            sits,
            handleClick
        }
    },
}
</script>

<style lang="scss">
.sit-content{
    width: 80%;
    margin: auto;

    .sit-block{
        width: 50px;
        height: 50px;
        border: 1px solid rgb(163, 163, 163);
        display: inline-block;
        margin: 10px;
    }
    .red{
        background-color: rgb(220, 102, 118);
    }
    .blue{
        background-color: rgb(90, 156, 248);
        cursor: pointer;
    }
    .blue:hover{
        background-color: rgb(54, 132, 241);
    }
    .gray{
        background-color: rgb(236, 238, 244);
    }
}
</style>