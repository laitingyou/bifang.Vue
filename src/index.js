import Vue from 'vue';
import routes from './router';
import Vuex from 'vuex';
import Store from './store';
import View from './view.vue';

import 'publicPath/css/normalize.min.css'
import './static/base.scss'


const app = new Vue({
    el: '#app',
    router:routes,
    render: h=>h(View)
})