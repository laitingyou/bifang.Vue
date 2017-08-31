<template>
    <!--<div contenteditable="true">-->
        <!--This text can be edited by the user.-->
    <!--</div>-->
    <div>
        <template>
            <div>
                <V-input data="{{inputData}}"></V-input>
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
        }

    }

</script>