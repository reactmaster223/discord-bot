require('./bootstrap');
import Vue from 'vue';
import ViewUI from 'view-design';
import App from './App.vue';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false

// framework front-end
Vue.use(ViewUI);

import common from './common'
Vue.mixin(common)

new Vue({
  render: h => h(App),
}).$mount('#app')
