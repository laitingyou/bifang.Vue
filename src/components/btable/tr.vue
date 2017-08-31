<template>
    <tr @click="row_click">
        <slot >
        </slot>
    </tr>
</template>
<script>
    export  default {
        props: {
        },
        data () {
            return {

            }
        },
        methods: {
            row_click (){
                this.$emit('row_click');
            }
        }
    }
</script>
