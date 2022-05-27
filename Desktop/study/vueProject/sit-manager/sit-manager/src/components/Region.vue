<template>
    <h4 style="text-align: center">分区信息</h4>
    <div class="region-container">
        <div class="region" v-for="region in regions" :key="region.id" @click="jumpSit(region.id)">
            <div class="sit">
                <div class="blue"></div>
                <div class="blue"></div>
                <div class="red"></div>
                <div class="blue"></div>
            </div>
            <p>{{region.name}}</p>
            <p>{{region.availableSits}}</p>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Region',
    setup() {
        // vue实例
        const instance = getCurrentInstance().appContext.config.globalProperties
        // region信息
        const regions = ref([])
        // 获取region信息
        const getRegion = (id)=>{
            instance.$http.get('/sit/region',{id}).then((res)=>{
                regions.value = res.regions
            })
        }
        // 跳转到座位细节页面
        const jumpSit  = (id)=>{
            instance.$router.push(`/sit/detail?room=${instance.$route.query.room}&region=${id}`)
        }
        onMounted(()=>{
            const param = instance.$route.query
            console.log(param);
            getRegion(param.room)
        })

        return {
            regions,
            getRegion,
            jumpSit
        }
    },
}
</script>

<style lang="scss">
.region-container{
    width: 80%;
    margin: auto;

    .region{
        width: 26%;
        height: 27vh;
        border: 1px solid rgb(188, 188, 188);
        display: inline-block;
        margin: 20px;
        text-align: center;
        cursor: pointer;

        .sit{
            width: 60%;
            margin: auto;

            .red{
                display: inline-block;
                width: 50px;
                height:50px;
                background-color: rgb(220, 102, 118);
                margin: 10px;
                margin-bottom: 0px;
            }
            .blue{
                display: inline-block;
                width: 50px;
                height: 50px;
                background-color: rgb(90, 156, 248);
                margin: 10px;
                margin-bottom: 0px;
            }
        }

        p{
            margin: 2px;
            font-size: small;
            color: rgb(134, 134, 134);
        }
    }
}
</style>