<template>
    <div>
        <input type="text" @input="change($event.target.value)" v-model="inputData">
    </div>

</template>
<style>

</style>
<script>
    export default{
        name:'input',
        componentName: 'ElInput',
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
            selected:'',
            changes:Function
        },
        watch:{
            inputData(val){
                console.log(this)
               // this.$emit('update:foo',val);
                this.$root.$emit.apply(this.$root,['update',val])
              //  console.log(this.foo);
            }
        },
        mounted(){
            console.log(this);
        },
        methods:{

            emitChange(value){
                this.$emit('change', value);
            },
            change(val,a){
                this.changes.call(this,val);
            }
        }
    }
</script>