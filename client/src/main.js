import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import axios from 'axios';
// import * as Icons from '@ant-design/icons-vue'

axios.defaults.baseURL = process.env.VUE_APP_SERVER;

axios.interceptors.request.use(
  function (config) {
    console.log("request detail：", config);
    const token = store.state.user.token;
    if (token) {
      config.headers.authorization = token;
      console.log("add token in request header：", token);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const app = createApp(App)
app.use(store).use(router).use(Antd).mount('#app')

// const icons = Icons

// for (const i in icons) {
//   app.component(i, icons[i])
// }
