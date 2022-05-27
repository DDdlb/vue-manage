<template>
    <div class="welcome">
       <div class="content">
           <div class="title">欢迎来到</div>
           <div class="sub-title">自助选座系统</div>
           <!-- <div class="desc">-Vue3+ElementPlus+mysql</div> -->
       </div>
        <div class="img"></div>
    </div>
</template>

<script>
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'welcome'
}
</script>


<style lang="scss">
.welcome{
    display: flex;
    background-color: #fff;
    height: calc(100vh - 120px);
    justify-content: center;
    align-items: center;
    .content{
        margin-right: 30px;
        .title{
            font-size: 30px;
            color: rgb(49, 49, 49);
            line-height: 40px;
        }
        .sub-title{
            font-size: 40px;
            line-height: 50px;
            color: #409eff;
        }
        .desc{
            text-align: right;
            font-size: 15px;
            line-height: 25px;
            color: rgb(134, 134, 134);
        }
    }
    .img{
        margin-left: 40px;
        width: 200px;
        height: 200px;
        background-image: url('../assets/logo.png');
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>
