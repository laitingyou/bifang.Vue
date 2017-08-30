import Vue from 'vue';
import routes from './router';
import Vuex from 'vuex';
import Store from './store';
import View from './view.vue';
import Global from './components/base/globalComponents';

import 'publicPath/css/normalize.min.css';
import 'publicPath/css/sakura.css';
import './static/base.scss'


const app = new Vue({
    el: '#app',
    router:routes,
    render: h=>h(View)
})