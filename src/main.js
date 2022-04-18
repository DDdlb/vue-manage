import {
	createApp
} from 'vue'
import App from './App.vue'
import request from './utils/request'
import ElementPlus from 'element-plus'
import router from './router/index'
import 'element-plus/dist/index.css'
import storage from './utils/storage'
import store from './store/index'
import * as ElIcons from '@element-plus/icons-vue'
// console.log(import.meta.env)

const app = createApp(App);

for (var name in ElIcons) {
	app.component(name, ElIcons[name])
}

app.config.globalProperties.$request = request;
app.config.globalProperties.$storage = storage;
app.use(ElementPlus).use(router).use(store).mount('#app')