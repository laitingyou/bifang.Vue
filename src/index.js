import Vue from 'vue';
import routes from './router';
import Vuex from 'vuex';
import Store from './store';
import View from './view.vue';
import Global from './components/base/globalComponents';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-light.css'
Vue.use(MuseUI)
import 'publicPath/css/normalize.min.css';
//import 'publicPath/css/sakura.css';
import './static/base.scss'
// Vue.directive('my-directive', {
//     insert: function () {
//         console.log('insert')
//     },
//     update: function (newValue, oldValue) {
//         // 根据获得的新值执行对应的更新
//         // 对于初始值也会被调用一次
//     },
//     unbind: function () {
//         // 做清理工作
//         // 比如移除在 bind() 中添加的事件监听器
//     }
// })

const app = new Vue({
    el: '#app',
    router:routes,
    render: h=>h(View)
})
