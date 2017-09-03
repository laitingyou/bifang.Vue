/**
 * Created by root on 17-9-3.
 */
import Button from './button/index';
import Input from './input/index';
import Checkbox from './checkbox/index';
import Radio from  './radio/index';
import Table from './table/index';

const components=[
    Button,
    Input,
    Checkbox,
    Radio,
    Table
];

const install = function (Vue) {
    components.map(component=>{
        Vue.component(component.name,component);
    })
}

export default {
    install,
    Button,
    Input
}
