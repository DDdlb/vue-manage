<template>
  <h1>{{count}}</h1>
  <button @click="handleAdd">+</button>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
</template>


<script setup name="app">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref } from 'vue';
import http from './utils/http'

let count = ref(0)

const handleAdd = ()=>{
  count.value = count.value + 1
  console.log(count.value);
}

onMounted(()=>{
  console.log("mounted");
  http.get('/api/test').then((res)=>{
    console.log(res);
  })
})

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
