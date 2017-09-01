<template>
    <div>
        <div>{{inputData}}</div>
        <input type="text" v-model="inputData">
    </div>

</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                inputData:''
            }
        },
        props:{
            data:''
        },
        watch:{
            inputData(val){
                this.$emit('update:foo',val)
            }
        },
        mounted(){
        },
        method:{

        }
    }
</script>