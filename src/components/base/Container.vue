<template>
    <div>
        <template>
            <div class="layout">
                <div class="header">
                    <div class="logo">
                        BiFang.Vue
                    </div>
                    <div class="nav">
                        <mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
                            <mu-tab value="tab1" title="Demo"/>
                            <mu-tab value="tab2" title="Events"/>
                            <mu-tab value="tab3" title="Props"/>
                        </mu-tabs>
                    </div>
                </div>
                <div class="content">
                    <V-nav></V-nav>
                </div>
                <div class="footer">
                    Muse-UI ©2017 Created by Muse-UI
                </div>
            </div>
        </template>
    </div>
</template>

<style scoped>
    .layout{
        background-color: rgb(236, 236, 236);
    }

    .header{
        background-color: #7e57c2;
    }

    .logo{
        font-size: 24px;
        color: white;
        display: inline-block;
        padding: 10px 20px;
    }

    .nav{
        display: inline-block;
        width: calc(100% - 180px);
        margin: 0 auto;
    }

    .tab{
        margin: 0 auto;
        width: 400px;
        background-color: rgba(0, 0, 0, 0);
    }

    .content{
        overflow: hidden;
    }



    .footer{
        padding: 20px 0;
        text-align: center;
    }
</style>
<script>
    import Nav from  './Nav.vue';
    export default {
        data () {
            return {
                activeTab: 'tab1'
            }
        },
        components:{
            'V-nav':Nav
        },
        methods: {
            handleTabChange (val) {
                this.activeTab = val
            }
        }
    }
</script>