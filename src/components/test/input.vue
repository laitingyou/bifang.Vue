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

        },
        mounted(){
            this.inputData=this.data;
        },
        method:{

        }
    }
</script>