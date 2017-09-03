<template>
    <div>
        <template>
            <div>
                <!--<V-input ref="input"  v-focus="123" :changes="change"></V-input>-->
                <el-button>12312</el-button>
                <b-input @change="change" :value="inputData"></b-input>
                <BCheckbox></BCheckbox>
                <BRadio :value=false></BRadio>
            </div>
        </template>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<style>

</style>
<script>
    import Table from './btable/table.vue';
    import Input from './test/input.vue';
    export default {
        name:'WW',
        componentName: 'WW',
        data(){
           return{
                inputData:'123213222',
               tableData: [{
                   date: '2016-05-02',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1518 弄'
               }, {
                   date: '2016-05-04',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1517 弄'
               }, {
                   date: '2016-05-01',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1519 弄'
               }, {
                   date: '2016-05-03',
                   name: '王小虎',
                   address: '上海市普陀区金沙江路 1516 弄'
               }]
           }
        },
        components:{
            'V-Table':Table,
            'V-input':Input
        },
        mounted(){
//            this.$root.$on('update',function (val) {
//                console.log(1,Input)
//            })
        },
        methods:{
            some(){
                console.log(4213)
            },
            change(val){
                console.log(val)
            }
        },
        directives:{
           focus:{
               bind(el,arg) {

               }
           }
        }

    }

</script>