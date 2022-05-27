<template>
<div class="sit">
    <h3>个人信息</h3>
    <router-view></router-view>
</div>
    
</template>

<script>

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'User',
    setup() {
        
    },
}
</script>

<style lang="scss">
.sit{
    background-color: #fff;
    height: calc(100vh - 120px);
    padding: 20px;
}
</style>