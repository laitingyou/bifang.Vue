<template>
    <div>
        <template>
            <div>
                <V-input ref="input" :data.sync="inputData" v-focus="123"></V-input>
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
            setTimeout(()=>{
                this.$emit('data-loaded');
                console.log(this)
            },3000)
        },
        methods:{
            some(){
                console.log(4213)
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