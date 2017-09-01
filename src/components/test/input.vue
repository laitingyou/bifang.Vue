<template>
    <div>
        <select :value="selected" @change="emitChange($event.target.value)">
                <option :value="123"></option>
                <option :value="443"></option>
        </select>
        {{selected}}
    </div>

</template>
<style>

</style>
<script>
    export default{
        inject:['foo'],
        data(){
            return{
                inputData:''
            }
        },
        model:{
            prop:'selected',
            event:'change'
        },
        props:{
            data:'',
            selected:''
        },
        watch:{
            inputData(val){
                this.$emit('update:foo',val);
                console.log(this.foo);
            }
        },
        mounted(){
        },
        methods:{
            emitChange(value){
                this.$emit('change', value);
            }
        }
    }
</script>