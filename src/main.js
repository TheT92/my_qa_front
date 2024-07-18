/*
 * @name: 
 * @param: 
 * @return: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from '@/mixins/global';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import intercept from './utils/interceptor';
import './style/font.css'

intercept();
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.mixin(mixin);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
