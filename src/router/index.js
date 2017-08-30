/**
 * Created by root on 17-8-29.
 */
import Vue from 'vue';
import Router from 'vue-router';
import Comtainer from '../components/base/Container.vue';
Vue.use(Router);
export default new Router({
    base: __dirname,
    routes:[
        {
            path:'/',
            component:Comtainer
        }
    ]



});