/**
 * Created by root on 17-9-3.
 */
import Button from './button/index';

const components=[
    Button
];

const install = function (Vue) {
    components.map(component=>{
        Vue.component(component.name,component);
    })
}

export default {
    install,
    Button
}
