<template>
    <div >

        <div class="hp-wrapper">

            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>

            <router-view v-if="!$route.meta.keepAlive">
            </router-view>
        </div>
    </div>
</template>
<style scoped>
    .hp-nav-vertical-inner {
        overflow-y: auto;
        position: fixed;
        width: 200px;
        border-radius: 0px;
    }

    .el-menu--dark {
        background-color: #4964a1 !important;
    }
    /*新加样式*/
    ::-webkit-scrollbar {
        width: 0px;
    }
</style>
<style>
    .el-menu--dark .el-submenu .el-menu {
        background-color: #344f8e !important;
    }
</style>
<script>
    export default {
        data(){
            return{
                divShow:true,
            }
        },
        methods: {
            onClick(href){
                //
                this.$router.push(href+"?site_id=8&lang=zh&user_id=yinfxs&token=E2156934668EDA8D101587F51D5C50D2");
            },
            onClickHK(href){
                //
                this.$router.push(href+"?site_id=3&lang=zh&user_id=yinfxs&token=E2156934668EDA8D101587F51D5C50D2");
            }
        }
    }
</script>