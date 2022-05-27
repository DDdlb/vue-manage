<template>
    <h4 style="text-align: center">自习室信息</h4>
    <div class="room-container">
        <div class="room" v-for="room in rooms" :key="room.id" @click="handleRoom(room.id)">
            <el-icon class="icon-room"><OfficeBuilding /></el-icon>
            <p>{{room.name}}</p>
            <p>空闲座位：{{room.availableSits}}</p>
        </div>
    </div>
</template>

<script>
import { getCurrentInstance, onMounted, ref } from '@vue/runtime-core'

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Room',
    setup() {
        // vue实例
        const instance = getCurrentInstance().appContext.config.globalProperties
        // 自习室数据
        const rooms = ref({})
        // 点击room事件处理
        const handleRoom = (id)=>{
            instance.$router.push(`/sit/region?room=${id}`)
        }

        onMounted(()=>{
            instance.$http.get('/sit/room').then((res)=>{
                rooms.value = res.rooms
                console.log(rooms.value);
            })
        })
        return {
            rooms,
            handleRoom
        }
    },
}
</script>

<style lang="scss">
.room-container{
    width: 80%;
    margin: auto;

    .room{
        width: 30%;
        margin: auto;
        display: inline-block;
        border: 1px solid rgb(186, 186, 186);
        height: 20vh;
        margin: 40px;
        padding: 30px;
        margin-bottom: 20px;
        margin-top: 20px;
        text-align: center;
        cursor: pointer;
        box-shadow: 0 0 3px rgb(206, 206, 206);

        .icon-room{
            font-size: 100px;
        }

        p{
            margin-top: 5px;
            font-size: small;
            color: rgb(109, 109, 109);
        }
    }
}
</style>