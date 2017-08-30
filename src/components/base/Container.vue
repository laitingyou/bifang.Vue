<template>
    <div class="hp-menu-h100">
        <menus></menus>
        <b-nav></b-nav>
        <div class="placeholder" v-if="show"></div>
        <div :class="show?'container':'container-hide'">
            <router-view>
            </router-view>
        </div>
    </div>
</template>
<style scoped>
    .container {
        /*margin-top: 75px;*/

        /*新加样式*/
        height: -webkit-calc(100% - 75px);
        height: calc(100% - 75px);
        height: -moz-calc(100% - 75px);
    }

    .container-hide{
        height: 100%;
    }

    /*新加样式*/
    .placeholder{
        visibility: hidden;
        height: 75px;
    }
    .hp-menu-h100{
        overflow: hidden;
    }
    .container{
        overflow-y: scroll !important;
        overflow-x: hidden;
    }
    ::-webkit-scrollbar {
        width: 5px;
        background-color: #4964a1;
    }
    ::-webkit-scrollbar-track{
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 10px;
        background-color: #F5F5F5 ;
    }
    ::-webkit-scrollbar-thumb{
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #4964a1;
    }
</style>
<script>
    import Menu from './Menu.vue';
    import Nav from  './Nav.vue';
    export default {
        data(){
            return {
                show:true,
            }
        },
        components: {
            'menus': Menu,
            'b-nav':Nav
        },
    }
</script>