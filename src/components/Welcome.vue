<template>
    <div>
        <template>
            <div>
                <!--<V-input ref="input"  v-focus="123" :changes="change"></V-input>-->
                <el-button>12312</el-button>
                <b-input @change="change" :value="inputData"></b-input>
                <BCheckbox></BCheckbox>
                <BRadio :value=false></BRadio>
                <b-table></b-table>
            </div>
        </template>
    </div>
</template>
<style>

</style>
<script>
    import Table from './btable/src/table.vue';
    import Input from './test/input.vue';
    export default {
        name:'WW',
        componentName: 'WW',
        components:{
            'V-Table':Table,
            'V-input':Input
        },
        mounted(){
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