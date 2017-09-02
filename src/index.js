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
//
import 'element-ui/lib/theme-default/index.css';
// import mixin from './util/mixins'
// Vue.use(mixin);
import my from './components/index';
Vue.use(my);
const Wx={
    methods:{
        col(){
            console.log(2132134)
        }
    }
};
const app = new Vue({
    el: '#app',
    router:routes,
    render: h=>h(View),
    mixins:[Wx],
    provide: {
        foo: Wx
    }
});
