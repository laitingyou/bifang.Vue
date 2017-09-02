<template>
    <div>
        <template>
            <div>
                <V-input ref="input"  v-focus="123" :changes="change"></V-input>
                <ElButton>12312</ElButton>
            </div>
        </template>
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
                inputData:'123213222'
           }
        },
        components:{
            'V-Table':Table,
            'V-input':Input
        },
        mounted(){
            this.$root.$on('update',function (val) {
                console.log(1,Input)
            })
        },
        methods:{
            some(){
                console.log(4213)
            },
            change(val,a){
                //console.log(val)
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