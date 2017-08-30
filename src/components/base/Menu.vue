<template>
    <div class="menu" v-if="show">
    </div>
</template>
<style scoped>


    .menu{
        height:75px;
        background-color:#4964a1;
        top:0;
        left:0;
        position: fixed;
        width:100%;
        z-index:999;
    }

</style>

<script>
    export default {
        data() {
           return {
               show:true
           }
        }
    }
</script>