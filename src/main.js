// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource  from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import $ from 'jquery'
import gojs from 'gojs'
import constant from '@/common/constant'
import util from '@/common/util'
import VueTree from '@/components/common/VueTree'
import Select from '@/components/common/Select';
import Search from '@/components/common/Search';
import LabelAndValue from '@/components/common/LabelAndValue';
import RadioGroup from '@/components/common/RadioGroup';
import Model from '@/components/common/Model';
import UE from '@/components/common/UE';
import 'font-awesome/css/font-awesome.css'
import './common/index.less'


Vue.prototype.Util = util;
window.Util = util;
Vue.prototype.Constant = constant;
window.Constant = constant;
window.$ = $;
window.go = gojs;
util.init();
Vue.config.productionTip = false
Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
Vue.component('vue-tree', VueTree)
Vue.component('Select', Select)
Vue.component('Search', Search)
Vue.component('LabelAndValue', LabelAndValue)
Vue.component('Model', Model)
Vue.component('RadioGroup', RadioGroup)
Vue.component('UE', UE)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

})
